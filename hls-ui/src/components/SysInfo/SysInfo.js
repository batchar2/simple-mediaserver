import React, {useEffect, useState, useCallback} from "react";

import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import ReactSpeedometer from "react-d3-speedometer";


const SysInfo = () => {
    const [info, setInfo] = useState({});
    useEffect(() => {
        console.log("!!!!")
        const id = setInterval(() => {
            axios.get('/api/info/')
                .then(resp => {
                    setInfo(resp.data);
                })
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <Row>
                { info &&
                <ReactSpeedometer
                    value={info.cpu && parseFloat(info.cpu).toFixed( 2 )}
                    currentValueText={info.cpu && `${parseFloat(info.cpu).toFixed( 2 )} CPU%`}
                    segmentColors={["limegreen", "gold", "tomato", "firebrick", ]}
                />

                }
            </Row>
            <Row>
                { info &&
                <ReactSpeedometer
                    // maxValue={3}
                    value={info.memory && parseFloat(info.memory).toFixed( 2 )}
                    currentValueText={info.memory && `Memory ${info.memory}Mb`}
                    segmentColors={["limegreen", "gold", "tomato", "firebrick", ]}
                />
                }
            </Row>
            <Row>
                { info &&
                <ReactSpeedometer
                    maxValue={10}
                    value={info.bitrate && parseFloat(info.bitrate).toFixed( 2 )}
                    currentValueText={ info.bitrate && `Bitrate ${info.bitrate}Mb`}
                    segmentColors={["limegreen", "gold", "tomato", "firebrick", ]}
                />
                }
            </Row>
        </>
    )
};

export default SysInfo;