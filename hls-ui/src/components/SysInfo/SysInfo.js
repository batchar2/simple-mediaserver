import React, {useEffect, useState} from "react";

import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";


const SysInfo = ({stream}) => {
    const [info, setInfo] = useState({});
    useEffect(() => {
        const id = setInterval(() => {
            axios.get(`/api/video/info/${stream}/`)
                .then(resp => {
                    setInfo(resp.data);
                })
        }, 500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="graph-wrapper">
                { info &&
                <ReactSpeedometer
                    width={250}
                    height={250}
                    maxValue={1600}
                    value={info.cpu && `${parseFloat(info.cpu).toFixed( 2 )}`}
                    currentValueText={info.cpu && `${parseFloat(info.cpu).toFixed( 2 )} CPU%`}
                    maxSegmentLabels={5}
                    segments={1000}
                    startColor="green"
                    endColor="red"
                />

                }
                { info &&
                <ReactSpeedometer
                    width={250}
                    height={250}
                    maxValue={8000}
                    value={info.memory && `${parseFloat(info.memory).toFixed( 2 )}`}
                    currentValueText={info.memory && `Memory ${info.memory}Mb`}
                    maxSegmentLabels={5}
                    segments={1000}
                    startColor="green"
                    endColor="red"
                />
                }
                { info &&
                <ReactSpeedometer
                    width={250}
                    height={250}
                    maxValue={10}
                    value={info.bitrate && `${parseFloat(info.bitrate).toFixed( 2 )}`}
                    currentValueText={ info.bitrate && `Bitrate ${info.bitrate}Mb`}
                    maxSegmentLabels={5}
                    segments={1000}
                    startColor="green"
                    endColor="red"
                />
                }
        </div>
    )
};

export default SysInfo;