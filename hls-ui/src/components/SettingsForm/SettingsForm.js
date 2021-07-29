import React from "react";
import { useForm } from "react-hook-form";

import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const SettingsForm = ({data, onSubmit}) => {
    const { register, handleSubmit } = useForm();
    const onSubmitDefault = (data) => {
    };

    return (
        <form className="form-group" onSubmit={handleSubmit(onSubmit || onSubmitDefault)}>
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
            {/*<Row>*/}
            {/*    <Col>Encoded stream</Col>*/}
            {/*</Row>*/}
            <Row>
                <label htmlFor="resolution" className="col-sm-2 col-form-label">Resolution</label>
                <div className="col-sm-2">
                    <Form.Select {...register("resolution")} defaultValue={data && data['resolution']}>
                        <option value="1920x1080">1920x1080</option>
                        <option value="1280x720">1280x720</option>
                        <option value="720x480">720x480</option>
                        <option value="480x360">480x360</option>
                        <option value="360x280">360x280</option>
                    </Form.Select>
                </div>
            </Row>
            <Row>
                <label htmlFor="bitrate" className="col-sm-2 col-form-label">Bitrate</label>
                <div className="col-sm-2">
                    <Form.Select {...register("bitrate")} defaultValue={data && data['bitrate']}>
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
                        <option value="1M">1M0</option>
                        <option value="0.8M">0.8M</option>
                        <option value="0.5M">0.5M</option>
                    </Form.Select>
                </div>
            </Row>
            <Row>
                <label htmlFor="i-frame" className="col-sm-2 col-form-label">I-frame interval</label>
                <div className="col-sm-2">
                    <Form.Select {...register("i-frame")} defaultValue={data && data['i-frame']}>
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
                    </Form.Select>
                </div>
            </Row>
            <Row>
                <label htmlFor="preset" className="col-sm-2 col-form-label">preset</label>
                <div className="col-sm-2">
                    <Form.Select {...register("preset")} defaultValue={data && data['preset']}>
                        <option value="ultrafast">ultrafast</option>
                        <option value="superfast">superfast</option>
                        <option value="veryfast">veryfast</option>
                        <option value="faster">faster</option>
                        <option value="fast">fast</option>
                        <option value="medium">medium</option>
                        <option value="slow">slow</option>
                        <option value="slower">slower</option>
                        <option value="veryslow">veryslow</option>
                    </Form.Select>
                </div>
            </Row>
            <Row>
                <Col>
                    <input type="submit"/>
                </Col>

            </Row>
        </form>
    );
};





export default SettingsForm;