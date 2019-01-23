import React from 'react';

import { TopicsTable } from './topics/topics';
import { subscribeToTimer } from './socket';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: []
        };

        subscribeToTimer(information => {
            let topics = [...this.state.information];
            topics.push(information);
            this.setState({
                information: topics
            });
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

export default Home;
