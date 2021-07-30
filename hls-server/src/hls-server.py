#!/usr/bin/env python3
import pathlib
from flask import Flask, render_template, jsonify, request, Response

from mediaserver import SimpleMediaserver


app = Flask(__name__)


@app.route('/api/settings/', methods=['GET',])
def get_settings():
    config = SimpleMediaserver.get_config()
    return jsonify(config)


@app.route('/api/settings/', methods=['POST',])
def set_settings():
    config = SimpleMediaserver.set_config(request.json)
    SimpleMediaserver.restart()
    return jsonify(config)


@app.route('/api/video/stream/<stream>.m3u8', methods=['GET',])
def get_playlist(stream):
    print('stream>', stream)
    content, status_code = SimpleMediaserver.get_playlist(stream)
    return Response(content,
        status=status_code,
        mimetype='application/vnd.apple.mpegurl'
    )

@app.route('/api/video/stream/<stream>/<chank_name>.ts', methods=['GET',])
def get_chank(stream, chank_name):
    content, status_code = SimpleMediaserver.get_chank(stream, chank_name)
    return Response(content,
        status=status_code,
        mimetype='video/MP2T'
    )

@app.route('/api/video/info/<stream>/', methods=['GET',])
def get_process_info(stream):
    info = SimpleMediaserver.get_info(stream)
    return jsonify(info)


if __name__ == '__main__':
    app.run(port=8000, debug=True)
