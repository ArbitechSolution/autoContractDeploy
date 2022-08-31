import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import "./DepolyForm.css";
import { byteCode } from '../constants/byteCode';
import { abi } from '../constants/deployContract';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { connectWallet } from '../store/actions/actions'
import { BsFillFileEarmarkArrowDownFill, BsFillCloudDownloadFill } from 'react-icons/bs';
function DeployForm() {
  const { acc } = useSelector(state => state.wallletAddress);
  let [verifyLink, setVerifyLink]=useState("");
  let [isVerify, setIsVerify]=useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    if (acc == "No Wallet") {
      console.log("Not Connected");
    } else if (acc == "Wrong Network") {
      console.log("Not Connected");
    } else if (acc == "Connect Wallet") {
      console.log("Not Connected");
    } else {
      console.log(data);
      let { collectionName, collectionSymbol, maxSupply, mintAmount, whiteList, preSalePrice, publicSalePrice } = data;
      console.log("json", JSON.parse(whiteList));
      const web3 = window.web3;
      const contract = new web3.eth.Contract(abi);
   
      let res = await contract.deploy({
        data: byteCode,
        arguments:
          [
            collectionName,
            collectionSymbol,
            maxSupply,
            mintAmount,
            JSON.parse(whiteList),
          "https://gateway.pinata.cloud/ipfs/QmerrQyPBz7rZw1wLrLMBDaV8s6bTS57LoRSqHJQEHy4T6/",
            preSalePrice,
            publicSalePrice
          ]
      }).send({
        from: acc
      })
      // console.log("resss", JSON.strigfy(res));
      console.log("res", res);
      let {_address}=res;
      console.log("contract",_address);
    //   let {_address} = res.Contract
    // console.log("_address", _address);
      // https://testnet.bscscan.com//verifyContract?a=0xDd4fA0Ef2C0E42Cd227c4DC94C1DD40B53d5AD90
      setVerifyLink(`https://testnet.bscscan.com/address/${_address}`)
      setIsVerify(true);
    }
  };

  const getWalletAddress = () => {
    console.log("");
    dispatch(connectWallet())
  }
  
  return (
    <div className='container' >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='row d-flex justify-content-around' >
          <div className='col-md-6 ' >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>IPFS CID</Form.Label>
              <Form.Control type="text" placeholder="Enter CID" value="QmerrQyPBz7rZw1wLrLMBDaV8s6bTS57LoRSqHJQEHy4T6"
                {...register("cid", { required: true })}
              />
              <Form.Text className="text-muted">
                This is the CID of the metadata directory on IPFS. It is used to generate the contract address.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Collaction Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Collaction Name"
                {...register("collectionName", { required: true })}
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Collection Symbol</Form.Label>
              <Form.Control type="text"  placeholder="Enter Collection Symbol"
                {...register("collectionSymbol", { required: true })}
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
              {/* </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Minting Cost (ether)</Form.Label>
              <Form.Control type="number" placeholder="Enter Minting Cost"
                {...register("mintingCost", { required: true })}
              /> */}
              <Form.Text className="text-muted">
                The cost of minting a new token : The owner and whitelisted addresses will not be charged.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Max Supply</Form.Label>
              <Form.Control type="number"  placeholder="Enter Max Supply"
                {...register("maxSupply", { required: true })}
              />
              <Form.Text className="text-muted">
                The maximum number of tokens that can be minted.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Max Mint Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter Max Mint Amount"
                {...register("mintAmount", { required: true })}
              />
              <Form.Text className="text-muted">
                The maximum amount of tokens that can be minted at once.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>WhiteList addresses</Form.Label>
              <Form.Control type="text"  placeholder="Enter WhiteList Address"
                {...register("whiteList", { required: true })}
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Presale price</Form.Label>
              <Form.Control type="number"  placeholder="Enter Presale price"
                {...register("preSalePrice", { required: true })}
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Public sale price</Form.Label>
              <Form.Control type="number"  placeholder="Enter Public sale price"
                {...register("publicSalePrice", { required: true })}
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
            </Form.Group>
          </div>
          <div className='col-md-4 ' >
            <div className=''>
              <div className='bg-cover mt-5'>
                <div className='file_download'>
                  <div className='file_icon'>
                    <a href='./Contract.txt' download className="text-white">

                      <BsFillFileEarmarkArrowDownFill />
                    </a>
                  </div>
                  <div className='text-primary'>
                    CONTRACT.SOL<span><BsFillCloudDownloadFill /></span>
                  </div>
                </div>
              </div>
              <div className='fornBtn'>

                {acc != "No Wallet" && acc != "Connect Wallet" && acc != "Wrong Network" && acc != undefined
                  ?
                  <button type='submit' className='btn btn-danger'>Deploy contract</button>
                  :
                  <button className='btn btn-danger' onClick={getWalletAddress}>{acc === "No Wallet"
                    ? "Connect Wallet"
                    : acc === "Connect Wallet"
                      ? "Connect Wallet"
                      : acc === "Wrong Network"
                        ? acc
                        : acc == undefined
                          ? "Connect Wallet"
                          : acc.substring(0, 3) + "..." + acc.substring(acc.length - 3)}</button>

                }


              </div>
              <div className='deployedSection'>
                <h3 className='bg-secondary text-light'>Deployed Contract</h3>
                <div className='deploy'>
                  {
                    isVerify ?
                    <a href={verifyLink} target="blank">Deployed Contract</a>
                    :
                  <span>No contract deployed</span>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>

    </div>
  )
}

export default DeployForm