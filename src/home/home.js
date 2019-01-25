import React from 'react';
import { connect } from 'react-redux';

import { TopicsTable } from './topics/topics';
import { subscribeToTimer } from './socket';
import { addStock } from '../actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: []
        };
        subscribeToTimer(information => {
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
