# FROM ffmpeg/coverity
FROM linuxserver/ffmpeg:amd64-version-4.4-cli

ARG DEBIAN_FRONTEND=noninteractive


RUN apt-get update -y

# nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN node --version

# nginx
RUN apt-get install -y nginx
COPY nginx/nginx.conf /etc/nginx/sites-available/default


# python
RUN apt-get install -y python3 python3-pip
RUN apt-get install -y mediainfo


# react
COPY hls-ui /hls-ui
WORKDIR /hls-ui
RUN npm install && npm run build && rm -r node_modules


# hls-server
COPY hls-server/requirements.txt /hls-server/requirements.txt
RUN pip3 install -r /hls-server/requirements.txt
COPY hls-server /hls-server
WORKDIR /


# start script
RUN echo "#!/usr/bin/env sh                         \n\
    nginx                                           \n\
    cd /hls-server/src/                             \n\
    gunicorn --workers 1 --bind 0.0.0.0:8000 --access-logformat=' %(t)s %(r)s %(s)s  time_ms=%(M)s ' --access-logfile=- hls-server:app  \n\
" > /start.sh && chmod +x /start.sh

ENTRYPOINT []
CMD /start.sh
