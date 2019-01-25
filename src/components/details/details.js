import React from 'react';
import axios from 'axios';
import { API_URL } from '../../environment/environment';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { News } from './news/news';
import { BasicInfo } from './info/info';
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

    getStockInfo() {
        let stockName =
            this.props.match && this.props.match.params
                ? this.props.match.params.stock
                : null;
        this.getChartInfo(stockName, '');
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
        return (
            <div className="container">
                <h1>
                    Details: {this.state.stockName} |{' '}
                    <span className="desc">
                        {this.state.stockInfo
                            ? this.state.stockInfo.company.description
                            : null}
                    </span>
                </h1>
                <BasicInfo
                    info={
                        this.state.stockInfo && this.state.stockInfo.quote
                            ? this.state.stockInfo.quote
                            : null
                    }
                />
                <h3 className="underline">
                    <span>{this.state.stockName} Last 1 Month Performance</span>
                </h3>
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
                                    this.getChartInfo(this.state.stockName, '');
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
