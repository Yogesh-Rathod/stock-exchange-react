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
    }

    componentDidMount() {
        subscribeToTimer(information => {
            let topics = [...this.state.information];
            topics.push(information);
            this.setState(
                {
                    information: topics
                },
                () => {
                    // console.log(
                    //     'this.state.information ',
                    //     this.state.information
                    // );
                    this.props.addStock(this.state.information);
                    console.log('this.props ', this.props);
                }
            );
        });
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
