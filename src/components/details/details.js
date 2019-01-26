import React from 'react';
import axios from 'axios';
import { API_URL } from '../../environment/environment';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { News } from './news/news';
import { BasicInfo } from './info/info';
import Financial from './financial/financial';
import ExportExcel from '../export-excel/export-excel';
am4core.useTheme(am4themes_animated);

class StockDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getStockInfo();
    }

    getChartInfo(stockName, duration) {
        this.setState({ chartDuration: duration });
        axios
            .get(`${API_URL.STOCKS}/stock/${stockName}/chart/${duration}`)
            .then(data => {
                this.initChart(data.data);
            })
            .catch(error => {});
    }

    getFinancialInfo(stockName) {
        axios
            .get(`${API_URL.STOCKS}/stock/${stockName}/financials`)
            .then(data => {
                this.setState({ financials: data.data });
            })
            .catch(error => {});
    }

    getStockInfo() {
        let stockName =
            this.props.match && this.props.match.params
                ? this.props.match.params.stock
                : null;
        this.getChartInfo(stockName, '');
        this.getFinancialInfo(stockName);
        axios
            .get(
                `${
                    API_URL.STOCKS
                }/stock/${stockName}/batch?types=quote,news,company&range=1m&last=1`
            )
            .then(data => {
                this.setState({
                    stockName: stockName,
                    stockInfo: data.data
                });
            })
            .catch(error => {});
    }

    initChart(data) {
        let chart = am4core.create('chartDiv', am4charts.XYChart);

        chart.paddingRight = 20;
        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'high';

        series.tooltipText = 'High: {label}: {valueY.value}';

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.dateX = 'date';
        series2.dataFields.valueY = 'low';

        series2.tooltipText = 'Low: {label}: {low}';

        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.dateX = 'date';
        series3.dataFields.valueY = 'open';

        series3.tooltipText = 'Open: {label}: {low}';

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        let labelValue = [];
        if (this.state.financials && this.state.financials.financials) {
            labelValue.push(
                {
                    label: 'Report Date',
                    value: 'reportDate'
                },
                {
                    label: 'Gross Profit',
                    value: 'grossProfit'
                },
                {
                    label: 'Cost Of Revenue',
                    value: 'costOfRevenue'
                },
                {
                    label: 'Operating Revenue',
                    value: 'operatingRevenue'
                },
                {
                    label: 'Total Revenue',
                    value: 'totalRevenue'
                },
                {
                    label: 'Net Income',
                    value: 'netIncome'
                },
                {
                    label: 'Current Assets',
                    value: 'currentAssets'
                },
                {
                    label: 'Total Assets',
                    value: 'totalAssets'
                },
                {
                    label: 'Current Cash',
                    value: 'currentCash'
                },
                {
                    label: 'Total Cash',
                    value: 'totalCash'
                },
                {
                    label: 'Share Holder Equity',
                    value: 'shareholderEquity'
                }
            );
        }
        return (
            <div className="container top-buffer">
                <div className="img-container text-center">
                    {this.state.stockName ? (
                        <img
                            src={`https://storage.googleapis.com/iex/api/logos/${
                                this.state.stockName
                            }.png`}
                            alt="Stock Logo"
                        />
                    ) : null}
                </div>
                <h1>
                    {this.state.stockName} |{' '}
                    <span className="desc">
                        {this.state.stockInfo
                            ? this.state.stockInfo.company.description
                            : null}
                    </span>
                </h1>
                <hr />
                <BasicInfo
                    info={
                        this.state.stockInfo && this.state.stockInfo.quote
                            ? this.state.stockInfo.quote
                            : null
                    }
                />
                <hr />
                <h3 className="underline">
                    <span>{this.state.stockName} Performance</span>
                </h3>
                <Tabs
                    className="top-buffer"
                    defaultActiveKey={2}
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey={1} title="Chart">
                        <div className="row duration-selector">
                            <div className="col-xs-2">
                                <ul>
                                    <li
                                        className={
                                            !this.state.chartDuration
                                                ? 'active underline pointer'
                                                : 'pointer'
                                        }
                                        onClick={() => {
                                            this.getChartInfo(
                                                this.state.stockName,
                                                ''
                                            );
                                        }}
                                    >
                                        <span>Last 12 Months</span>
                                    </li>
                                    <li
                                        className={
                                            this.state.chartDuration === '6m'
                                                ? 'active underline pointer'
                                                : 'pointer'
                                        }
                                        onClick={() => {
                                            this.getChartInfo(
                                                this.state.stockName,
                                                '6m'
                                            );
                                        }}
                                    >
                                        <span>Last 6 Months</span>
                                    </li>
                                    <li
                                        className={
                                            this.state.chartDuration === '2y'
                                                ? 'active underline pointer'
                                                : 'pointer'
                                        }
                                        onClick={() => {
                                            this.getChartInfo(
                                                this.state.stockName,
                                                '2y'
                                            );
                                        }}
                                    >
                                        <span>Last 2 Years</span>
                                    </li>
                                    <li
                                        className={
                                            this.state.chartDuration === '5y'
                                                ? 'active underline pointer'
                                                : 'pointer'
                                        }
                                        onClick={() => {
                                            this.getChartInfo(
                                                this.state.stockName,
                                                '5y'
                                            );
                                        }}
                                    >
                                        <span>Last 5 Years</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xs-10">
                                <div
                                    id="chartDiv"
                                    style={{ width: '100%', height: '400px' }}
                                />
                            </div>
                        </div>
                        <div className="bars top-buffer">
                            <ul>
                                <li>
                                    <span className="square high" />
                                    <span>High</span>
                                </li>
                                <li>
                                    <span className="square open" />
                                    <span>Open</span>
                                </li>
                                <li>
                                    <span className="square low" />
                                    <span>Low</span>
                                </li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Financial">
                        {this.state.financials &&
                        this.state.financials.financials ? (
                            <ExportExcel
                                data={this.state.financials.financials}
                                labelValue={labelValue}
                            />
                        ) : null}

                        <Financial financials={this.state.financials} />
                    </Tab>
                </Tabs>

                <hr />
                <News
                    news={
                        this.state.stockInfo && this.state.stockInfo.news
                            ? this.state.stockInfo.news
                            : null
                    }
                    stockName={this.state.stockName}
                />
            </div>
        );
    }
}

export default StockDetails;
