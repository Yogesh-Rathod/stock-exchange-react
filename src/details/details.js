import React from 'react';
import axios from 'axios';
import { API_URL } from '../environment/environment';

class StockDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getStockInfo();
    }

    getStockInfo() {
        let stockName =
            this.props.match && this.props.match.params
                ? this.props.match.params.stock
                : null;
        axios
            .get(
                `${
                    API_URL.STOCKS
                }/stock/${stockName}/batch?types=quote,news,chart&range=1m&last=1`
            )
            .then(data => {
                this.setState({
                    stockInfo: data.data
                });
            })
            .catch(error => {
                console.log('error ', error);
            });
    }

    render() {
        console.log('this.state.stockInfo ', this.state.stockInfo);
        return (
            <div className="container">
                <h1>Details</h1>
            </div>
        );
    }
}

export default StockDetails;
