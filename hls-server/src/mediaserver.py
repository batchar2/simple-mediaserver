import os
import time
import glob
import json
import shutil
import subprocess

import psutil
from pathlib import Path
from MediaInfo import MediaInfo


STREAM_NAME_ORIGINAL = 'original'
STREAM_NAME_ENCDEC   = 'stream'

HLS_DATA_FOLDER = os.getenv('HLS_DATA_FOLDER', '/tmp/hls-data')

CONFIG_PATH = '/tmp/config.cfg'
CONFIG_DEFAULT = {
    'uri': 'rtsp://admin:Qwerty123456@192.168.1.102:554/',
    'codec': 'libx264',
    'resolution': '1920x1080',
    'bitrate': '4M',
    'i-frame': 50,
    'preset': 'fast',
    'crf': 20,
    'fps': 25,
}

# pass
# umh:partitions
FFMPEG_CMD_ENCDEC_TEMPLATE = '''ffmpeg -loglevel warning -i {uri}
        -c:v {codec} -r {fps} -s {resolution} -crf {crf} -maxrate {bitrate} -bufsize 2M -preset {preset} -keyint_min {i-frame} -g {i-frame} -sc_threshold 0
        -c:a aac -b:a 128k -ac 1
        -f hls
            -hls_time 4
            -hls_list_size 5
            -use_localtime_mkdir 1
            -hls_segment_filename {stream}/data%06d.ts
            -hls_start_number_source datetime
            -hls_flags delete_segments
        {stream}.m3u8
'''

FFMPEG_CMD_ORIGINAL_TEMPLATE = '''ffmpeg -loglevel warning -i {uri}
    -c:v copy
    -c:a copy
    -f hls
        -hls_time 4
        -hls_list_size 5
        -use_localtime_mkdir 1
        -hls_segment_filename {stream}/data%06d.ts
        -hls_start_number_source datetime
        -hls_flags delete_segments
    {stream}.m3u8
'''


singleton = lambda c: c()


@singleton
class SimpleMediaserver:
    def __init__(self, dir=None):
        self._process_encdec = None
        self._process_original = None

    def set_config(self, config):
        with open(CONFIG_PATH, 'w') as fp:
            data = json.dumps(config)
            fp.write(data)
        return config

    def restart(self):
        self._process_encdec = self._restart_ffmpeg(
            self._process_encdec,
            FFMPEG_CMD_ENCDEC_TEMPLATE,
            HLS_DATA_FOLDER,
            STREAM_NAME_ENCDEC
        )
        self._process_original = self._restart_ffmpeg(
            self._process_original,
            FFMPEG_CMD_ORIGINAL_TEMPLATE,
            HLS_DATA_FOLDER,
            STREAM_NAME_ORIGINAL
        )

    def get_config(self):
        config = Path(CONFIG_PATH)
        if config.is_file() is True:
            with config.open(mode='r') as fp:
                data = fp.read()
                return json.loads(data)
        return CONFIG_DEFAULT

    def get_playlist(self, stream):
        playlist = Path(HLS_DATA_FOLDER) / f'{stream}.m3u8'
        if playlist.is_file() is True:
            with playlist.open(mode='r') as fp:
                data = fp.read()
                return data, 200
        return None, 404

    def get_chank(self, stream, chank_name):
        chank = Path(HLS_DATA_FOLDER) / stream / f'{chank_name}.ts'
        if chank.is_file() is True:
            with chank.open(mode='rb') as fp:
                data = fp.read()
                return data, 200
        return None, 404

    def get_info(self, stream):
        if self._process_encdec is not None:
            is_alive, cpu, memory = self._get_resources_info(stream)
            chank_number, bitrate, duration = self._get_last_chank_info(stream)
            return {
                'isAlive': is_alive,
                'chunkNumber': chank_number,
                'pid': self._process_encdec.pid,
                'cpu': cpu,
                'memory': memory,
                'bitrate': bitrate,
                'duration': duration,
            }
        return {
            'isAlive': False,
            'chunkNumber': 0,
        }

    def _get_resources_info(self, stream):
        def get_threads_cpu_percent(p, interval=0.1):
            total_percent = p.cpu_percent(interval)
            total_time = sum(p.cpu_times())
            t = [total_percent * ((t.system_time + t.user_time)/total_time) for t in p.threads()]
            return sum(t)

        pid = self._process_encdec.pid
        if stream == STREAM_NAME_ORIGINAL:
            pid = self._process_original.pid

        process = psutil.Process(pid)
        cpu = get_threads_cpu_percent(process)
        memory = process.memory_info()[0]/2
        is_alive = process.status() == psutil.STATUS_SLEEPING
        return is_alive, cpu, round(memory / (1024*1024), 3)

    def _get_last_chank_info(self, stream):
        try:
            mask = Path(HLS_DATA_FOLDER) / stream / '*.ts'
            list_of_files = glob.glob(str(mask))
            files = sorted(list_of_files, key=os.path.getctime, reverse=True)
            if len(files) > 2:
                for filename in files[1:-1]:
                    try:
                        info = MediaInfo(filename=filename).getInfo()
                        bitrate = round(int(info['videoBitrate']) / (1024*1024), 3)
                        duration = info['videoDuration']
                        return len(files), bitrate, duration
                    except Exception as err:
                        print('!!!>>>>>>', err)
        except Exception as err:
            print('!!!>>>>>>', err)
        return 0, 0, 0

    def _restart_ffmpeg(self, process, template, data_folder, stream):
        try:
            if process is not None:
                process.kill() and process.terminate()
        except Exception as err:
            print('error ffmpeg>', err)
        # rm old data
        folder = Path(data_folder) / stream
        shutil.rmtree(folder, ignore_errors=True)
        os.makedirs(folder)
        # start ffmpeg
        config = self.get_config()
        mod_config = {**config, **{'stream': stream}}
        cmd = template \
            .format(**mod_config)\
            .replace('\n', '')
        return subprocess.Popen(
            cmd.split(),
            shell=False,
            cwd=data_folder,
            #stderr=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
        )
