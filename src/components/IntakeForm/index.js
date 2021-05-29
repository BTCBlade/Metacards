import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./IntakeForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MetaCardsABI from "./MetaCardsNft.json";

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

const MetaCardNftContacts = "0xc85D232cdf6eB37533a72F86f16e0Df306c391cC";

const IntakeForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  
  const [image, setImage] = useState(null);  
  const [walletAmount, setWalletAmount] = useState("");


  async function get_tokenURI(tokenID) {
    const web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();

    const MetaCardContract = new web3.eth.Contract(
      MetaCardsABI.abi,
      MetaCardNftContacts
    );

    await MetaCardContract.methods
      .tokenURI(tokenID)
      .call(function (error, result) {
        console.log(result);
        console.log(error);
      });
  }

  async function mint_nft(TokenURI) {
    const web3 = window.web3;
    const Ethaccounts = await web3.eth.getAccounts();

    const MetaCardContract = new web3.eth.Contract(
      MetaCardsABI.abi,
      MetaCardNftContacts
    );

    await MetaCardContract.methods
      .mint(Ethaccounts[0], Math.floor(Math.random() * (10000000 - 1)) + 1, TokenURI)
      .send({ from: Ethaccounts[0] })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  }

  async function send_data_to_ipfs() {
 
    let data = {
      "name" : name,
      "twitter" : twitter,
      "Image" : image
    }

    await ipfs.files.add(Buffer.from(JSON.stringify(data)), function (err, res) {
      if (err) {
          console.log(err);
      }
      console.log(res[0].hash);
      mint_nft("https://www.ipfs.io/ipfs/" + res[0].hash);
    })
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
  });

  return (
    <>
      <Container>
        <Row className="intakeForm-Row">
          <Col className="intakeForm-Col">
            <Form className="intakeForm">
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
              <Button onClick={() => send_data_to_ipfs()}>
                Upload
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IntakeForm;