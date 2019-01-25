import React from 'react';
import { connect } from 'react-redux';

import { TopicsTable } from '../../components/topics/topics';
import { subscribeToTopics } from '../../sockets/topics-socket';
import { addStock } from '../../actions';
import Crypto from '../crypto/crypto';

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
                <Crypto />
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
