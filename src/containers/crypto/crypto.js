import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_URL } from '../../environment/environment';
import { CryptoTable } from '../../components/crypto/crypto';
import { addCrypto } from '../../actions';

class Crypto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.props.state.Crypto.length) {
            axios.get(`${API_URL.NOCORS}/stock/market/crypto`).then(data => {
                let cryptoData = data.data;
                cryptoData.length = 5;
                this.setState({ crypto: cryptoData });
                this.props.addCrypto(cryptoData);
            });
        } else {
            this.setState({ crypto: this.props.state.Crypto[0].crypto });
        }
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

const mapDispatchToProps = dispatch => ({
    addCrypto: crypto => dispatch(addCrypto(crypto))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Crypto);
