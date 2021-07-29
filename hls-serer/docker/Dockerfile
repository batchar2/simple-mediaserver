FROM jrottenberg/ffmpeg:3.2-alpine

# time settings
ENV TZ=Europe/Moscow
RUN apk update
RUN apk add tzdata
# python
RUN apk add python3
RUN pip3 install --no-cache --upgrade pip setuptools

# default folders
ARG DATA_PATH="/data"
ENV DATA_PATH="${DATA_PATH}"
RUN mkdir -p "${DATA_PATH}" && chown 1000:1000 "${DATA_PATH}"

# script
# RUN echo -e '#!/usr/bin/env sh               \n\
# INPUT_STREAM="${1}"                          \n\
# if [[ -z "${INPUT_STREAM}" ]]                \n\
# then                                         \n\
#     echo "ERROR: input file is missing" >&2  \n\
#     exit 1                                   \n\
# fi                                           \n\
# cd "${DATA_PATH}"                            \n\
# ffmpeg -i "${INPUT_STREAM}" \
#     -c:v libx264 -s 640x480 -r25 -crf 21 -maxrate 1M -bufsize 2M -preset veryslow -keyint_min 100 -g 100 -sc_threshold 0 \
#     -c:a aac -b:a 128k -ac 1   \
#     -f hls -hls_time 6 -hls_playlist_type vod \
#     stream.m3u8  \
# ' > /start.sh && chmod +x /start.sh

RUN echo -e '#!/usr/bin/env sh               \n\
INPUT_STREAM="${1}"                          \n\
if [[ -z "${INPUT_STREAM}" ]]                \n\
then                                         \n\
    echo "ERROR: input file is missing" >&2  \n\
    exit 1                                   \n\
fi                                           \n\
cd "${DATA_PATH}" && ls -lha .               \n\
ffmpeg -i "${INPUT_STREAM}" \
    -c:v libx264 -r 25 -s 640x360 -crf 21 -maxrate 1M -bufsize 2M -preset veryfast -keyint_min 100 -g 100 -sc_threshold 0 \
    -c:a aac -b:a 128k -ac 1   \
    -f hls -hls_time 6 -hls_playlist_type vod \
    stream.m3u8  \
' > /start.sh && chmod +x /start.sh

RUN cat /start.sh

#USER 1000
#ENTRYPOINT []
ENTRYPOINT ["/start.sh"]
