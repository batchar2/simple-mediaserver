import React from "react";

import { Row, Col } from 'react-bootstrap';
import HlsPlayer from "../../components/HlsPlayer";
import SysInfo from "../../components/SysInfo";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Home = () => {
    return (
        <div>
            <Row>
                <h3>Home</h3>
            </Row>
            <Row fluid={"true"}>
                <Tabs>
                    <TabList>

                        <Tab>Encode&Decode</Tab>
                        <Tab>Original</Tab>
                    </TabList>

                    <TabPanel>
                        <Row>
                            <Col sm={9}>
                                {
                                    <HlsPlayer stream="stream"/>
                                }
                            </Col>
                            <Col sm={3}>
                                <SysInfo stream={'stream'}/>
                            </Col>
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <Row>
                            <Col sm={9}>
                                {
                                    <HlsPlayer stream="original"/>
                                }
                            </Col>
                            <Col sm={3}>
                                <SysInfo stream={'original'}/>
                            </Col>
                        </Row>
                    </TabPanel>
                </Tabs>


            </Row>
        </div>

    );
};

export default Home;

