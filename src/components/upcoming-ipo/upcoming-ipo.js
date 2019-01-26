import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';

import ExportExcel from '../export-excel/export-excel';
import { API_URL } from '../../environment/environment';

class UpcomingIPO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getUpcomingIPO();
    }

    getUpcomingIPO() {
        axios.get(`${API_URL.NOCORS}/stock/market/upcoming-ipos`).then(data => {
            this.setState({ ipo: data.data.viewData });
        });
    }
    render() {
        let labelValue = [];
        if (this.state.ipo) {
            labelValue.push(
                {
                    label: 'Symbol',
                    value: 'Symbol'
                },
                {
                    label: 'Company',
                    value: 'Company'
                },
                {
                    label: 'Price',
                    value: 'Price'
                },
                {
                    label: 'Shares',
                    value: 'Shares'
                },
                {
                    label: 'Amount',
                    value: 'Amount'
                },
                {
                    label: 'Float',
                    value: 'Float'
                },
                {
                    label: 'Percent',
                    value: 'Percent'
                },
                {
                    label: 'Market',
                    value: 'Market'
                },
                {
                    label: 'Expected Date',
                    value: 'Expected'
                }
            );
        }
        return (
            <div className="upcomingIPO">
                <h2>Upcoming IPO</h2>
                {this.state.ipo && this.state.ipo.length ? (
                    <ExportExcel
                        data={this.state.ipo}
                        labelValue={labelValue}
                    />
                ) : null}
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
                            <th>Expected Date</th>
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
