import React, {useEffect, useState} from 'react';
import ReactHlsPlayer from 'react-hls-player';
import axios from "axios";

import NoStream from './NoStream.png';

const HlsPlayer = ({src}) => {
    const playerRef = React.useRef();

    const [streamIsActive, setStreamIsActive] = useState(false);
    useEffect(() => {
        const id = setInterval(() => {
            axios.get(src)
                .then(resp => {
                    // playVideo()
                    setStreamIsActive(true);
                })
        }, 1000);
        return () => clearInterval(id);
    }, []);

    function playVideo() {
        playerRef.current.play();
    }
    function pauseVideo() {
        playerRef.current.pause();
    }

    function toggleControls() {
        playerRef.current.controls = !playerRef.current.controls;
    }

    return (
        <>
        {
            (streamIsActive)
            ?
                <ReactHlsPlayer
                    playerRef={playerRef}
                    src={src}
                    autoPlay={true}
                    controls={true}
                    width="100%"
                    height="auto"
                    hlsConfig={{
                        maxLoadingDelay: 4,
                        minAutoBitrate: 0,
                        lowLatencyMode: true,
                    }}
                />
            :
                <img src={NoStream}/>
        }
        </>
    );
};

export default HlsPlayer;