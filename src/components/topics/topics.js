import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom';

const TopicsTable = props => {
    return (
        <div>
            <h1>Top Stocks To Watch</h1>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Sector</th>
                        <th>Bid Price</th>
                        <th>Bid Size</th>
                        <th>Ask Price</th>
                        <th>Ask Size</th>
                        <th>Last Sale Time</th>
                        <th>Volume</th>
                        <th>Market Percent</th>
                        <th>Seq</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {props.topics && props.topics.length
                        ? props.topics.map((item, index) => {
                              item = JSON.parse(item);
                              return (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.symbol}</td>
                                      <td>{item.sector}</td>
                                      <td>{item.bidPrice}</td>
                                      <td>{item.bidSize}</td>
                                      <td>{item.askPrice}</td>
                                      <td>{item.askSize}</td>
                                      <td>
                                          {new Date(
                                              item.lastSaleTime
                                          ).toLocaleString()}
                                      </td>
                                      <td>{item.volume}</td>
                                      <td>{item.marketPercent}</td>
                                      <td>{item.seq}</td>
                                      <td className="text-center pointer">
                                          <Link to={`/details/${item.symbol}`}>
                                              <i className="fas fa-eye" />
                                          </Link>
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

export { TopicsTable };