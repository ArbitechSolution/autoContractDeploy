import {combineReducers} from 'redux';
import {getWalletAddress} from './reducers/getWalletAddress'

const allReducer = combineReducers({
    wallletAddress:getWalletAddress,
   

});

export default allReducer