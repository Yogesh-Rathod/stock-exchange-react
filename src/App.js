import React, { Component } from 'react';

import './App.scss';
import AppRouter from './routes/routes';

class App extends Component {
    render() {
        return (
            <div>
                <AppRouter />
            </div>
        );
    }
}

export default App;
