import React from 'react';
import { connect } from 'react-redux';

import { TopicsTable } from '../../components/topics/topics';
import { subscribeToTopics } from '../../sockets/topics-socket';
import { addStock } from '../../actions';
import Crypto from '../crypto/crypto';
import UpcomingIPO from '../../components/upcoming-ipo/upcoming-ipo';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: []
        };
        subscribeToTopics(information => {
            let topics = [...this.state.information];
            topics.push(information);
            this.setState(
                {
                    information: topics
                },
                () => {
                    this.props.addStock(this.state.information);
                }
            );
        });
    }

    componentDidMount() {
        if (this.props.state.Stocks && this.props.state.Stocks[0]) {
            this.setState({ information: this.props.state.Stocks[0].stock });
        }
    }

    render() {
        return (
            <div className="container top-buffer">
                <TopicsTable topics={this.state.information} />
                <hr />
                <Crypto />
                <hr />
                <UpcomingIPO />
                <div className="top-buffer">
                    <h2 className="underline">
                        For Best View Please{' '}
                        <span>disable CORS in Browser</span>
                    </h2>
                    <ul>
                        <li>
                            <h6>Disable Same Origin Policy in Chrome Linux</h6>
                            <p>- Run following command in Terminal</p>
                            <span>
                                google-chrome --user-data-dir="C:/Chrome dev
                                session" --disable-web-security
                            </span>
                        </li>
                        <li>
                            <h6>
                                Disable Same Origin Policy in Chrome Windows
                            </h6>
                            <p>- Enter Windows + R and paste following</p>
                            <span>
                                chrome.exe --user-data-dir="C://Chrome dev
                                session" --disable-web-security
                            </span>
                        </li>
                        <li>
                            <h6>Disable Same Origin Policy in Chrome OS X</h6>
                            <p>- Run following command in Terminal</p>
                            <span>
                                open -a Google\ Chrome --args
                                --disable-web-security --user-data-dir
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

const mapDispatchToProps = dispatch => ({
    addStock: stocks => dispatch(addStock(stocks))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
