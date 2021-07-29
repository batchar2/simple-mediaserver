import os
import glob
import json
import shutil
import subprocess

import psutil
from pathlib import Path
from MediaInfo import MediaInfo
#from hurry.filesize import size


HLS_DATA_FOLDER = '/tmp/hls-data/'
CONFIG_PATH = '/tmp/config.cfg'
CONFIG_DEFAULT = {
    'uri': 'rtsp://admin:skokov92@192.168.1.102:554/',
    'resolution': '1920x1080',
    'bitrate': '1M',
    'i-frame': 50,
    'preset': 'ultrafast',
}
# FFMPEG_CMD_TEMPLATE = '''ffmpeg -i "{uri}"
#         -c:v libx264 -r 25 -s {resolution} -crf 21 -maxrate {bitrate} -bufsize 2M -preset {preset} -keyint_min {i-frame} -g {i-frame} -sc_threshold 0 \
#         -c:a aac -b:a 128k -ac 1
#         -f hls -hls_time 4 -hls_playlist_type vod
#         stream.m3u8
# '''
FFMPEG_CMD_TEMPLATE = '''ffmpeg -i {uri}
        -c:v libx264 -r 25 -s {resolution} -crf 21 -maxrate {bitrate} -bufsize 2M -preset {preset} -keyint_min {i-frame} -g {i-frame} -sc_threshold 0
        -c:a aac -b:a 128k -ac 1
        -f hls
            -hls_time 2
            -hls_list_size 1
            -hls_start_number_source datetime
        stream.m3u8
'''


singleton = lambda c: c()


@singleton
class SimpleMediaserver:
    def __init__(self, dir=None):
        self._process = None

    def set_config(self, config):
        with open(CONFIG_PATH, 'w') as fp:
            data = json.dumps(config)
            fp.write(data)
        return config

    def restart(self):
        if self._process is not None:
            self._process.kill() and self._process.terminate()
        # rm old data
        shutil.rmtree(HLS_DATA_FOLDER, ignore_errors=True)
        os.makedirs(HLS_DATA_FOLDER)


        # start ffmpeg
        config = self.get_config()
        cmd = FFMPEG_CMD_TEMPLATE \
            .format(**config)\
            .replace('\n', '')
        self._process = subprocess.Popen(cmd.split(), shell=False, cwd=HLS_DATA_FOLDER)

    def get_config(self):
        config = Path(CONFIG_PATH)
        if config.is_file() is True:
            with config.open(mode='r') as fp:
                data = fp.read()
                return json.loads(data)
        return CONFIG_DEFAULT

    def get_playlist(self):
        playlist = Path(HLS_DATA_FOLDER) / 'stream.m3u8'
        if playlist.is_file() is True:
            with playlist.open(mode='r') as fp:
                data = fp.read()
                return data, 200
        return None, 404


    def get_chank(self, chank_name):
        chank = Path(HLS_DATA_FOLDER) / chank_name
        if chank.is_file() is True:
            with chank.open(mode='rb') as fp:
                data = fp.read()
                return data, 200
        return None, 404


    def get_info(self):
        if self._process is not None:
            cpu, memory = self._get_resources_info()
            bitrate, duration = self._get_last_chank_info()
            return {
                'pid': self._process.pid,
                'cpu': cpu,
                'memory': memory,
                'bitrate': bitrate,
                'duration': duration,
            }
        return {}

    def _get_resources_info(self):
        def get_threads_cpu_percent(p, interval=1):
            total_percent = p.cpu_percent(interval)
            total_time = sum(p.cpu_times())
            t = [total_percent * ((t.system_time + t.user_time)/total_time) for t in p.threads()]
            return sum(t)
        process = psutil.Process(self._process.pid)
        cpu = get_threads_cpu_percent(process)
        # memory = process.memory_info()[0]/2.**30  # GB
        memory = process.memory_info()[0]/2
        return cpu, round(memory / (1024*1024), 3)

    def _get_last_chank_info(self):
        try:
            mask = Path(HLS_DATA_FOLDER) / '*.ts'
            list_of_files = glob.glob(str(mask))
            files = sorted(list_of_files, key=os.path.getctime, reverse=True)
            if len(files) > 2:
                filename = files[1]
                info = MediaInfo(filename=filename).getInfo()
                bitrate = round(int(info['videoBitrate']) / (1024*1024), 3)
                duration = info['videoDuration']
                return bitrate, duration
        except Exception as err:
            print('!!!>>>>>>', err)
        return 0, 0
