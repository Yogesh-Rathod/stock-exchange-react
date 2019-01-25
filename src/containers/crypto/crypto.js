import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_URL } from '../../environment/environment';
import { CryptoTable } from '../../components/crypto/crypto';

class Crypto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`${API_URL.STOCKS}/stock/market/crypto`).then(data => {
            let cryptoData = data.data;
            cryptoData.length = 5;
            this.setState({ crypto: cryptoData });
        });
    }

    render() {
        return (
            <div>
                <CryptoTable crypto={this.state.crypto} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

// const mapDispatchToProps = dispatch => ({
//     addStock: stocks => dispatch(addStock(stocks))
// });

export default connect(mapStateToProps)(Crypto);
