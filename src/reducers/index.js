import { combineReducers } from 'redux';
import Stocks from './stocks';
import Crypto from './crypto';

export default combineReducers({
    Stocks,
    Crypto
});
