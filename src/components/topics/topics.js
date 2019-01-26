import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom';

import ExportExcel from '../export-excel/export-excel';

const TopicsTable = ({ topics }) => {
    let labelValue = [],
        parsedTopics = [];
    if (topics && topics.length) {
        topics.forEach(element => {
            parsedTopics.push(JSON.parse(element));
        });
        labelValue.push(
            {
                label: 'Symbol',
                value: 'symbol'
            },
            {
                label: 'Sector',
                value: 'sector'
            },
            {
                label: 'Bid Price',
                value: 'bidPrice'
            },
            {
                label: 'Bid Size',
                value: 'bidSize'
            },
            {
                label: 'Ask Price',
                value: 'askPrice'
            },
            {
                label: 'Ask Size',
                value: 'askSize'
            },
            {
                label: 'Last Sale Price',
                value: 'lastSalePrice'
            },
            {
                label: 'Last Sale Size',
                value: 'lastSaleSize'
            },
            {
                label: 'Volume',
                value: 'volume'
            },
            {
                label: 'Market Percent',
                value: 'marketPercent'
            },
            {
                label: 'Seq',
                value: 'seq'
            }
        );
    }

    return (
        <div className="upcomingIPO">
            <h2>Top Stocks To Watch</h2>
            {topics && topics.length ? (
                <ExportExcel data={parsedTopics} labelValue={labelValue} />
            ) : null}
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
                        <th>Last Sale Price (Time)</th>
                        <th>Last Sale Size (Time)</th>
                        <th>Volume</th>
                        <th>Market Percent</th>
                        <th>Seq</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {topics && topics.length
                        ? topics.map((item, index) => {
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
                                          {item.lastSalePrice}
                                          <br />
                                          <span>
                                              (
                                              {new Date(
                                                  item.lastSaleTime
                                              ).toLocaleString()}
                                              )
                                          </span>
                                      </td>
                                      <td>
                                          {item.lastSaleSize}
                                          <br />
                                          <span>
                                              (
                                              {new Date(
                                                  item.lastSaleTime
                                              ).toLocaleString()}
                                              )
                                          </span>
                                      </td>
                                      <td>{item.volume}</td>
                                      <td>{item.marketPercent}%</td>
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
