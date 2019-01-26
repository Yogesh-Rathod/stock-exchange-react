import React from 'react';
import Table from 'react-bootstrap/lib/Table';

const Financial = ({ financials }) => {
    return (
        <div className="top-buffer">
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Report Date</th>
                        <th>Gross Profit</th>
                        <th>Cost Of Revenue</th>
                        <th>Operating Revenue</th>
                        <th>Total Revenue</th>
                        <th>Net Income</th>
                        <th>Current Assets</th>
                        <th>Total Assets</th>
                        <th>Current Cash</th>
                        <th>Total Cash</th>
                        <th>Share Holder Equity</th>
                    </tr>
                </thead>
                <tbody>
                    {financials && financials.financials.length
                        ? financials.financials.map((item, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.reportDate}</td>
                                      <td>{item.grossProfit}</td>
                                      <td>{item.costOfRevenue}</td>
                                      <td>{item.operatingRevenue}</td>
                                      <td>{item.totalRevenue}</td>
                                      <td>{item.netIncome}</td>
                                      <td>{item.currentAssets}</td>
                                      <td>{item.totalAssets}</td>
                                      <td>{item.currentCash}</td>
                                      <td>{item.totalCash}</td>
                                      <td>{item.shareholderEquity}</td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </Table>
        </div>
    );
};

export default Financial;
