// import Hls from 'hls.js';
import 'video-react/dist/video-react.css';
import React from "react";

import 'videojs-errors';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

import 'videojs-contrib-hls';

videojs.options.hls.overrideNative = true;
videojs.options.html5.nativeAudioTracks = false;
videojs.options.html5.nativeVideoTracks = false;

window.videojs = videojs;


class HlsPlayer extends React.Component {
    componentDidMount() {
        // instantiate Video.js
        const config = {
            /*html5: {
                hls: {
                    withCredentials: true
                }
            }*/
            html5: {
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                hls: {
                    debug: true,
                    overrideNative: true
                }
            }
        };
        this.player = videojs(this.videoNode, config, () => {
            console.log('onPlayerReady', this);
            const errorDisplay = this.player.getChild('errorDisplay');
            errorDisplay.off(this.player, 'error', errorDisplay.open);
            const src = `/api/video/stream/${this.props.stream}.m3u8`;
            this.player.play();
            try {
                this.player.src({src: src, type: 'application/x-mpegURL', withCredentials: true});
                this.player.on('error', (e) => {
                    // еще раз
                    if (this.player && src) {
                        setTimeout(
                            () => {
                                if (this.player && src) {
                                    this.player.src({
                                        src: src,
                                        type: 'application/x-mpegURL',
                                        withCredentials: true
                                    });
                                    this.player.play();
                                }
                            },
                            300
                        );
                    }
                });
            } catch(e) {
                console.log('player err>', e);
            }
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
            delete this.player;
        }
    }

    render() {
        return (
            <div className={"data-vjs-player"}>
                <video
                    width={"100%"}
                    height={"800"}
                    ref={ node => this.videoNode = node }
                    autoPlay={true}
                    controls={true}
                    muted={true}
                    className="video-js vjs-default-skin vjs-big-play-centered"
                    data-setup={'{"fluid": true}'}
                />
            </div>
        )
    }
}


export default HlsPlayer;

//
// import React, {useEffect, useState} from 'react';
// import ReactHlsPlayer from 'react-hls-player';
// import axios from "axios";
//
// import NoStream from './NoStream2.png';
//
// const HlsPlayer = ({stream}) => {
//     const src = `/api/video/${stream}.m3u8`
//     const playerRef = React.useRef();
//
//     const [streamIsActive, setStreamIsActive] = useState(false);
//     useEffect(() => {
//         const id = setInterval(() => {
//             axios.get(src)
//                 .then(resp => {
//                     setStreamIsActive(true);
//                     if (playerRef && playerRef.current) {
//                         playerRef.current.play();
//                     }
//                 });
//         }, 500);
//         return () => clearInterval(id);
//     }, []);
//
//
//
//     return (
//         <div style={{width: '100%', height:800}}>
//         {
//             (streamIsActive)
//             ?
//                 <ReactHlsPlayer
//                     playerRef={playerRef}
//                     src={src}
//                     muted={true}
//                     // playing={"true"}
//                     autoPlay={"true"}
//                     controls={"true"}
//                     width="100%"
//                     height="auto"
//                     hlsConfig={{
//                         autoStartLoad: true,
//                         startPosition: -1,
//                         maxLoadingDelay: 4,
//                         minAutoBitrate: 0,
//                         lowLatencyMode: true,
//                     }}
//                 />
//             :
//                 <img className="no-stream" src={NoStream}/>
//         }
//         </div>
//     );
// };
//
// export default HlsPlayer;