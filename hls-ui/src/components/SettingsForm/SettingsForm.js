import React from "react";
import { useForm } from "react-hook-form";

import { Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const SettingsForm = ({data, onSubmit}) => {
    const { register, handleSubmit } = useForm(data);
    return (
        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <label htmlFor="uri" className="col-sm-2 col-form-label">Input RTSP-URI</label>
                <div className="col-sm-10">
                    <Form.Control
                        type="input"
                        {...register("uri",  { required: true})}
                        defaultValue={data && data['uri']}
                    />
                </div>
            </Row>
            <Row>
                <label htmlFor="codec" className="col-sm-2 col-form-label">Codec</label>
                <div className="col-sm-2">
                    <div className="form-group">
                        <select
                            className="form-select"
                            defaultValue={data && data['codec']}
                            {...register("codec")}
                        >
                            <option value="libx264">H264</option>
                            <option value="libx265">H265</option>
                        </select>
                    </div>
                </div>
            </Row>
            <Row>
                <label htmlFor="fps" className="col-sm-2 col-form-label">Frame rate</label>
                <div className="col-sm-2">
                    <div className="form-group">
                        <select
                            className="form-select"
                            defaultValue={data && data['fps']}
                            {...register("fps")}
                        >
                            <option value="60">60</option>
                            <option value="50">50</option>
                            <option value="40">40</option>
                            <option value="30">30</option>
                            <option value="25">25</option>
                            <option value="20">20</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
            </Row>
            <Row>
                <label htmlFor="resolution" className="col-sm-2 col-form-label">Resolution</label>
                <div className="col-sm-2">
                    <div className="form-group">
                    <select
                        className="form-select"
                        defaultValue={data && data['resolution']}
                        {...register("resolution")}
                    >
                        <option value="3840x2160">3840x2160</option>
                        <option value="2592x1944">2592x1944</option>
                        <option value="2048×1536">2048×1536</option>
                        <option value="2048×1080">2048×1080</option>
                        <option value="1920x1080">1920x1080</option>
                        <option value="1280x720">1280x720</option>
                        <option value="720x480">720x480</option>
                        <option value="480x360">480x360</option>
                        <option value="360x280">360x280</option>
                    </select>
                    </div>
                </div>
            </Row>




            <Row>
                <label htmlFor="bitrate" className="col-sm-2 col-form-label">Bitrate</label>
                <div className="col-sm-2">
                    <select
                        className="form-select"
                        defaultValue={data && data['bitrate']}
                        {...register("bitrate")}
                    >
                        <option value="8M">8M</option>
                        <option value="7M">7M</option>
                        <option value="6M">6M</option>
                        <option value="5M">5M</option>
                        <option value="4M">4M</option>
                        <option value="3.5M">3.5M</option>
                        <option value="3M">3M</option>
                        <option value="2.5M">2.5M</option>
                        <option value="2M">2M</option>
                        <option value="1.8M">1.8M</option>
                        <option value="1.5M">1.5M</option>
                        <option value="1M">1M</option>
                        <option value="0.8M">0.8M</option>
                        <option value="0.5M">0.5M</option>
                    </select>
                </div>
            </Row>
            <Row>
                <label htmlFor="i-frame" className="col-sm-2 col-form-label">I-frame interval</label>
                <div className="col-sm-2">
                    <select
                        className="form-select"
                        defaultValue={data && data['i-frame']}
                        {...register("i-frame")}
                    >
                        <option value="200">200</option>
                        <option value="175">175</option>
                        <option value="150">150</option>
                        <option value="125">125</option>
                        <option value="100">100</option>
                        <option value="75">75</option>
                        <option value="50">50</option>
                        <option value="25">25</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>
            </Row>
            <Row>
                <label htmlFor="preset" className="col-sm-2 col-form-label">preset</label>
                <div className="col-sm-2">
                    <select
                        className="form-select"
                        defaultValue={data && data['preset']}
                        {...register("preset")}
                    >
                        <option value="ultrafast">ultrafast</option>
                        <option value="superfast">superfast</option>
                        <option value="veryfast">veryfast</option>
                        <option value="faster">faster</option>
                        <option value="fast">fast</option>
                        <option value="medium">medium</option>
                        <option value="slow">slow</option>
                        <option value="slower">slower</option>
                        <option value="veryslow">veryslow</option>
                    </select>
                </div>
            </Row>
            <Row>
                <label htmlFor="CRF" className="col-sm-2 col-form-label">CRF</label>
                <div className="col-sm-2">
                    <select
                        className="form-select"
                        defaultValue={data && data['crf']}
                        {...register("crf")}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </Row>
            {/*<Row>*/}
            {/*    <label htmlFor="partitions" className="col-sm-2 col-form-label">Partitions</label>*/}
            {/*    <div className="col-sm-2">*/}
            {/*        <select*/}
            {/*            className="form-select"*/}
            {/*            defaultValue={data && data['partitions']}*/}
            {/*            {...register("partitions")}*/}
            {/*        >*/}
            {/*            <option value="8M">8M</option>*/}
            {/*            <option value="7M">7M</option>*/}
            {/*            <option value="6M">6M</option>*/}
            {/*            <option value="5M">5M</option>*/}
            {/*            <option value="4M">4M</option>*/}
            {/*            <option value="3.5M">3.5M</option>*/}
            {/*            <option value="3M">3M</option>*/}
            {/*            <option value="2.5M">2.5M</option>*/}
            {/*            <option value="2M">2M</option>*/}
            {/*            <option value="1.8M">1.8M</option>*/}
            {/*            <option value="1.5M">1.5M</option>*/}
            {/*            <option value="1M">1M</option>*/}
            {/*            <option value="0.8M">0.8M</option>*/}
            {/*            <option value="0.5M">0.5M</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*</Row>*/}
            <Row>
                <Col>
                    <button type="submit" className="btn btn-secondary">Start</button>
                </Col>
            </Row>
        </form>
    );
};





export default SettingsForm;