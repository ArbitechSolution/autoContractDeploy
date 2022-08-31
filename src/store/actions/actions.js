import types from '../types';
import {loadWeb3} from '../../connectWeb3'


export const connectWallet = () => async (dispatch) => {
  let address = await loadWeb3();
  dispatch({
    type: types.connectWallet,
    payload: address
  })
}

