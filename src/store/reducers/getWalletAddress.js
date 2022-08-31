import types from '../types';

let initialState = {
    acc:"Connect Wallet"
};

export const getWalletAddress = (state=initialState, {type, payload}) => {
console.log("payload", payload);
    switch(type){
        case types.connectWallet :
            return {
                ...state,
                acc:payload,
            }
        default : return{...state}
    }

}