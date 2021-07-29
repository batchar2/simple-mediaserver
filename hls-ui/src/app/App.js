import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import './App.css';

import Home from "../pages/home";
import Settings from "../pages/settings";
import LeftMenu from "../components/LeftMenu";

const App = () => {
    return (
        <div className="App">

            <div id="left-menu">
                <LeftMenu/>
            </div>

            <div id="content">
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route path="/" component={Home} exact />
                                <Route path="/settings" component={Settings} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default App;
