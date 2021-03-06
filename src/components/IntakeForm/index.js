import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./IntakeForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MetaCardsABI from "./MetaCardsNft.json";
import { NFTStorage, File } from "nft.storage";

const MetaCardNftContacts = "0xc85D232cdf6eB37533a72F86f16e0Df306c391cC";

const { apiKey } = require("./config.json");
const client = new NFTStorage({ token: apiKey });

const IntakeForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("Metacards");
  const [twitter, setTwitter] = useState("@Twitter_handle");

  const [image, setImage] = useState(null);
  const [walletAmount, setWalletAmount] = useState("");

  const [tokenURIlink, setTokenURIlink] = useState("");

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
      .mint(
        Ethaccounts[0],
        Math.floor(Math.random() * (10000000 - 1)) + 1,
        TokenURI
      )
      .send({ from: Ethaccounts[0] })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  }

  async function send_data_to_ipfs() {
    const metadata = await client.store({
      name: name,
      description: twitter,
      image: new File([image], "MetaCards.png", { type: "image/png" }),
    });
    console.log(metadata.url);
    //URL Str prep
    let https_URL = "https://ipfs.io/ipfs/" + metadata.url.slice(7);
    console.log(https_URL);

    setTokenURIlink(https_URL);

    await mint_nft(https_URL);
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
                    setImage(URL.createObjectURL(file));
                    // setImage(file);
                  }}
                />
              </div>
              <div>
                {errors.map((error) => (
                  <div>{error}</div>
                ))}
              </div>
              <Button onClick={() => send_data_to_ipfs()}>Upload</Button>
            </Form>
          </Col>
          <Col>
            <div className="metacard-preview-container">
              <img className="preview-image" src={image}></img>
              <div className="preview-name">{name}</div>
              <div className="preview-twitter">{twitter}</div>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <div Style="color: white; margin-left:5rem;">
        <h4>
          Token URI link: <a href={tokenURIlink}> {tokenURIlink} </a>{" "}
        </h4>
      </div>
    </>
  );
};

export default IntakeForm;
