import openSocket from 'socket.io-client';

import { API_URL } from '../environment/environment';

const socket = openSocket(`${API_URL.STOCKS}/tops`);

function subscribeToTopics(cb) {
    // Listen to the channel's messages
    socket.on('message', message => {
        cb(message);
    });

    // Connect to the channel
    socket.on('connect', () => {
        socket.emit('subscribe', 'GOOGL,MSFT,AAPL,AMZN,FB,AMD,WMT,AIG+');
        socket.emit('unsubscribe', 'GOOGL,MSFT,AAPL,AMZN,FB,AMD,WMT,AIG+');
    });

    // Disconnect from the channel
    socket.on('disconnect', () => console.log('Disconnected.'));
}

export { subscribeToTopics };
