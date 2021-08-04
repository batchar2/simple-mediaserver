# FROM ffmpeg/coverity
FROM linuxserver/ffmpeg:amd64-version-4.4-cli

ARG DEBIAN_FRONTEND=noninteractive

ARG HLS_DATA_FOLDER=/tmp/hls-data
ENV HLS_DATA_FOLDER="${HLS_DATA_FOLDER}"

RUN apt-get update -y

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN node --version


# install nginx
RUN apt-get install -y nginx

# install python
RUN apt-get install -y python3 python3-pip
RUN apt-get install -y mediainfo
# install envsubst
RUN apt-get install -y gettext


# react
COPY hls-ui /hls-ui
WORKDIR /hls-ui
RUN npm install && npm run build && rm -r node_modules


# hls-server
COPY hls-server/requirements.txt /hls-server/requirements.txt
RUN pip3 install -r /hls-server/requirements.txt
COPY hls-server /hls-server
WORKDIR /


# nginx settings
COPY nginx/nginx.conf /etc/nginx/sites-available/default
# mod config
#RUN envsubst < /etc/nginx/sites-available/default > /tmp/1.txt && cp /tmp/1.txt /etc/nginx/sites-available/default && rm /tmp/1.txt


# start script
RUN echo "#!/usr/bin/env sh                         \n\
    nginx                                           \n\
    cd /hls-server/src/                             \n\
    gunicorn --workers 1 --threads 12 --bind 0.0.0.0:8000  hls-server:app  \n\
" > /start.sh && chmod +x /start.sh


ENTRYPOINT []
CMD /start.sh
