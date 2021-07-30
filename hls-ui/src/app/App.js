import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import './App.css';

import Home from "../pages/home";
import Settings from "../pages/settings";
import LeftMenu from "../components/LeftMenu";

const App = () => {
    return (
        <div className="App">
            <Row className="main-row">
                <Col sm={2} className="left-menu-wrapper">
                    <div id="left-menu">
                        <LeftMenu/>
                    </div>
                </Col>

                <Col sm={10}>
                    <div id="content">
                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/settings" component={Settings} />
                        </Switch>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default App;
