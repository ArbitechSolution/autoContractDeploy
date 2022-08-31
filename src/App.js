import React, {useEffect} from 'react';
import {loadWeb3} from './connectWeb3';
import {abi} from './constants/deployContract';
import {byteCode} from './constants/byteCode';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeployContractForm from './components/DeployForm';
import './App.css'
  
  function App() {
    return (
  
      <div >
      <DeployContractForm />
      </div>
  );
}

export default App;
