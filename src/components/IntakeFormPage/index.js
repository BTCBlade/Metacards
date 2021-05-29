import React, { useState, useEffect } from "react";
import IntakeForm from "../IntakeForm";
import Nav from "../Navbar";
import Web3 from "web3";

import Container from "react-bootstrap/Container";
import "./IntakeFormPage.css";

export default function IntakeFormPage() {
  const [walletAmount, setWalletAmount] = useState(null);

  async function getWalletAmount() {
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

    let wallet = await loadWeb3();

    if (wallet) {
      const web3 = window.web3;

      const accounts = await window.web3.eth.getAccounts();
      const address = { account: accounts[0] }.account;
      if (address) {
        web3.eth.getBalance(address, function (error, wei) {
          if (!error) {
            let balance = web3.utils.fromWei(wei, "ether");
            console.log(balance);
            setWalletAmount(balance.substring(0, 4));
          }
        });
      }
    } else {
      return <h1>Get metamask, newb!</h1>;
    }
  }

  useEffect(() => {
    getWalletAmount();
  }, []);
  return (
    <>
      <Container className="IntakeFormPage-Main">
        <Nav></Nav>
        <IntakeForm />
      </Container>
    </>
  );
}
