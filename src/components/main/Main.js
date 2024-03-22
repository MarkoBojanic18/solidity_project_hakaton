import "./Main.css";
import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import Web3 from "web3";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const RecordFactoryAddress = "0xFBa954D3AaB1f39719424849F4Cb71e9A9F78f57";
  const sepoliaRPCUrl =
    "https://sepolia.infura.io/v3/67bc1009f5a547cc978659e13579ddf0";

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected to Ethereum account: ", accounts[0]);
        console.log("Account ", account);
        console.log(typeof accounts[0]);
        window.ethereum.on("accountsChanged", (newAccounts) => {
          setAccount(newAccounts[0]);
          console.log("Switched to account: ", newAccounts[0]);
        });
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
    connectWallet();
    console.log("Web3 instance set up: ", web3);
  }, []);

  return (
    <div className="banner">
      <Navbar account={account} />

      <div className="content">
        {!account ? (
          <div>
            <button className="connect-wallet-button" onClick={connectWallet}>
              Connect with metamask
            </button>
            <h1>PERSONAL HEALTHCARE RECORD</h1>
            <p>
              Keep track of your health with privacy
            </p>
          </div>
        ) : (
          <div className="login-wrapper">
            <div>
            <h1>WELCOME TO YOUR PHR </h1>
            <p>
              Log in to continue...
            </p>
            </div>
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button
              type="button"
              className="login-button"
              onClick={() => setShowCreateModal(true)}
            >
              Login
            </button>
            {showCreateModal && (
              <Login
                className="create-new-client-modal"
                web3={web3}
                account={account}
                onClose={() => setShowCreateModal(false)}
                RecordFactoryAddress={RecordFactoryAddress}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
