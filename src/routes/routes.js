import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from '../containers/home/home';
import StockDetails from '../components/details/details';

const AppRouter = () => (
    <Router>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/details/:stock" component={StockDetails} />
        </div>
    </Router>
);

export default AppRouter;
