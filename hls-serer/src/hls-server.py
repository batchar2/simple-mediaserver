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
    print('request.json>', request.json)
    config = SimpleMediaserver.set_config(request.json)
    SimpleMediaserver.restart()
    return jsonify(config)


@app.route('/api/video/stream.m3u8', methods=['GET',])
def get_playlist():
    content, status_code = SimpleMediaserver.get_playlist()
    return Response(content,
        status=status_code,
        mimetype='application/vnd.apple.mpegurl'
    )

@app.route('/api/video/<chank_name>', methods=['GET',])
def get_chank(chank_name):
    content, status_code = SimpleMediaserver.get_chank(chank_name)
    return Response(content,
        status=status_code,
        mimetype='video/MP2T'
    )

@app.route('/api/info/', methods=['GET',])
def get_process_info():
    info = SimpleMediaserver.get_info()
    return jsonify(info)


if __name__ == '__main__':
    app.run(port=8000, debug=True)
