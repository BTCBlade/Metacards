import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Web3 from "web3";

import fleekStorage from "@fleekhq/fleek-storage-js";


import "./IntakeForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import MetaCardsABI from "./MetaCardsNft.json";
const MetaCardNftContacts = "0x00d90b17f0A9E12A97bf330B7C718e5b92880e0B";

const ONE_ETHER = 1000000000000000000;

const testURI = "https//www.google.com";

const IntakeForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [image, setImage] = useState(null);


  const [walletAmount, setWalletAmount] = useState("");

  //Need a way to generate tokenIDs
  const [tokenID, setTokenID] = useState(147);
  
  //Can enter public key or pull from connected wallet with {Accounts[0]}
  const [address, setAddress] = useState("0xb2aB0c8E2302eA6D1cF2C2bE505fbBb8816AeA41");
  
  //Set TokenURI as IPFS upload url and hash.
  const [tokenURI, setTokenURI] = useState("https://www.google.com");

  const apiSecret = process.env.REACT_APP_FLEEK_API_SECRET;
  const apiKey = process.env.REACT_APP_FLEEK_API_KEY;

  const testFleekUpload = async (data) => {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
      apiKey,
      apiSecret,
      key: `file-${timestamp}`,
      data,
    };
    try {
      const result = await fleekStorage.upload(input);
      console.log(result);
    } catch (e) {
      console.log("error", e);
    }
  };


  //JSON version
  const send_as_JSON = async (e) => {
    e.preventDefault();
    let ret_JSON = { name: name, twitter: twitter, image: image };
    console.log(ret_JSON);
    testFleekUpload(image);
  };


  const send_to_IPFS = async (e) => {
    e.preventDefault();


  async function get_tokenURI(tokenID) {
    const  web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();

    const MetaCardContract = new web3.eth.Contract(
        MetaCardsABI.abi,
        MetaCardNftContacts
    )

    await MetaCardContract.methods.tokenURI(tokenID).call(function (error, result) {
        console.log(result);
    })
  }

  async function mint_nft() {
    const  web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();

    const MetaCardContract = new web3.eth.Contract(
        MetaCardsABI.abi,
        MetaCardNftContacts
    )

    await MetaCardContract.methods
      .mint(Ethaccounts[0], tokenID, tokenURI)
      .send({ from: Ethaccounts[0]})
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return true;
    } else {
      return false;
    }
  }

  useEffect(async () => {
    var wallet = await loadWeb3();

    if (wallet) {
      const web3 = window.web3;
  
      const accounts = await web3.eth.getAccounts();
      const address = { account: accounts[0] }.account;
  
      if (address) {
        web3.eth.getBalance(address, function (error, wei) {
          if (!error) {
            var balance = web3.utils.fromWei(wei, "ether");
            setWalletAmount(balance.substring(0, 4));
          }
        });
      } 
    }
    
  })

  return (
    <>
    <Form className="intakeForm" onSubmit={send_as_JSON}>
      <h2>Data Intake</h2>
      <div className="input-div">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label htmlFor="twitter">Twitter</label>
        <input
          name="twitter"
          type="text"
          placeholder="Your twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label htmlFor="file">Image File</label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
          }}
        />
      </div>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <Button className="upload-btn" variant="secondary" type="submit">
        Upload
      </Button>
    </Form>
    
    <div Style="background-color:white; 
                        width:300px; 
                        height: 500px; 
                        margin:30px;
                        padding:15px;">

            {/* <h1> Input the following Information to mint a Token </h1> */}

            <h1> Enter Info: </h1>

            <h2>Token ID: </h2>
            <input
                type="text"
                value={tokenID}
                onChange={e => setTokenID(e.target.value)}
            />

            <h2>Public Key:</h2>
            <input 
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />

            <h2>TokenURI:</h2>
            <input 
                type="text"
                value={tokenURI}
                onChange={e => setTokenURI(e.target.value)}
            />

            <br />
            <br />

            <button onClick={() => mint_nft()} >
                Submit
            </button>

            <br />
            <h2>Wallet Amount: {walletAmount}</h2>
        </div>

    </>
  );
};

export default IntakeForm;
