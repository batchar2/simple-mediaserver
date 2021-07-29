import React, {useEffect, useState, useCallback} from "react";

import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
import ReactSpeedometer from "react-d3-speedometer"
import { Container, Row, Col } from 'react-bootstrap';
import HlsPlayer from "../../components/HlsPlayer";
import SysInfo from "../../components/SysInfo";



const Home = () => {
    return (
        <div>
            <Row>
                <h3>Home</h3>
            </Row>
            <Row>
                <Col sm={11}>
                    {
                        <HlsPlayer src="/api/video/stream.m3u8"/>
                    }
                </Col>
                <Col sm={1}>
                    <SysInfo/>
                </Col>
            </Row>
        </div>

    );
};

export default Home;

