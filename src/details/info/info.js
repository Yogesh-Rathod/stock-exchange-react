import React from 'react';
import Table from 'react-bootstrap/lib/Table';

export const BasicInfo = ({ info }) => {
    return (
        <div>
            {info ? (
                <div className="row">
                    <h3 className="underline">
                        <span>{info.symbol} Basic Info</span>
                    </h3>
                    <div className="col-xs-6">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <b>company Name</b>
                                    </td>
                                    <td>{info.companyName}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>primary Exchange</b>
                                    </td>
                                    <td>{info.primaryExchange}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>sector</b>
                                    </td>
                                    <td>{info.sector}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-xs-6">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <b>latest Price</b>
                                    </td>
                                    <td>{info.latestPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>52 week High</b>
                                    </td>
                                    <td>{info.week52High}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>52 week Low</b>
                                    </td>
                                    <td>{info.week52Low}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
