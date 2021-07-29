import React from 'react';
import ReactHlsPlayer from 'react-hls-player';

const HlsPlayer = ({src}) => {
    const playerRef = React.useRef();

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
    );
};

export default HlsPlayer;