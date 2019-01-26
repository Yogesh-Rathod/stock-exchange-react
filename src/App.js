import React, { Component } from 'react';

import './App.scss';
import AppRouter from './routes/routes';
import Header from './components/header/header';
import Footer from './components/footer/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <AppRouter />
                <Footer />
            </div>
        );
    }
}

export default App;
