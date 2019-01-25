import React from 'react';
import Table from 'react-bootstrap/lib/Table';

const CryptoTable = ({ crypto }) => {
    return (
        <div className="crypto">
            <h1>Top Crypto To Watch</h1>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Company Name</th>
                        <th>Calculation Price</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Latest Price</th>
                        <th>Latest Source</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {crypto && crypto.length
                        ? crypto.map((item, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.symbol}</td>
                                      <td>{item.companyName}</td>
                                      <td>{item.calculationPrice}</td>
                                      <td>
                                          {item.open}
                                          <br />
                                          <span>
                                              {new Date(
                                                  item.openTime
                                              ).toLocaleString()}
                                          </span>
                                      </td>
                                      <td>
                                          {item.close} <br />
                                          <span>
                                              {new Date(
                                                  item.closeTime
                                              ).toLocaleString()}
                                          </span>
                                      </td>
                                      <td>{item.high}</td>
                                      <td>{item.low}</td>
                                      <td>
                                          {item.latestPrice}
                                          <br /> <span>{item.latestTime}</span>
                                      </td>
                                      <td>{item.latestSource}</td>
                                      <td>
                                          {item.change} OR{' '}
                                          <span>{item.changePercent}%</span>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </Table>
        </div>
    );
};

export { CryptoTable };
