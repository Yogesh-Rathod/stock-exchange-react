import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';

import { API_URL } from '../../environment/environment';

class UpcomingIPO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getUpcomingIPO();
    }

    getUpcomingIPO() {
        axios.get(`${API_URL.STOCKS}/stock/market/upcoming-ipos`).then(data => {
            this.setState({ ipo: data.data.viewData });
        });
    }
    render() {
        return (
            <div>
                <h1>Upcoming IPO</h1>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Shares</th>
                            <th>Amount</th>
                            <th>Float</th>
                            <th>Percent</th>
                            <th>Market</th>
                            <th>Expected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ipo && this.state.ipo.length ? (
                            this.state.ipo.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Symbol}</td>
                                        <td>{item.Company}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.Shares}</td>
                                        <td>{item.Amount}</td>
                                        <td>{item.Float}</td>
                                        <td>{item.Percent}</td>
                                        <td>{item.Market}</td>
                                        <td>{item.Expected}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    <b>No Data Available</b>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UpcomingIPO;
