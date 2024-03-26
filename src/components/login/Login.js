import React, { useState, useEffect } from "react";
import "./Login.css"; // Import the CSS file
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import RecordFactoryABI from "../../contracts/RecordFactory.json";

const Login = ({
  onClose,
  account,
  web3,
  RecordFactoryAddress,
  MedicalPersonFactoryAddress,
}) => {
  sessionStorage.setItem("RecordFactoryAddress", RecordFactoryAddress);
  sessionStorage.setItem(
    "MedicalPersonFactoryAddress",
    MedicalPersonFactoryAddress
  );
  const [patientPassword, setClientData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorMessage("");
    setClientData(e.target.value);
  };

  const handleSubmit = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!web3 || !account) {
      alert("Web3 instance or account is not available.");
      return;
    }

    if (patientPassword == "") {
      setErrorMessage("Field password can't be empty!");
    } else {
      try {
        const recordFactory = new web3.eth.Contract(
          RecordFactoryABI.abi,
          RecordFactoryAddress
        );
        const loginStatus = await recordFactory.methods
          .loginPatient(patientPassword)
          .call({ from: account });

        console.log("Korisnik je logovan: ", loginStatus);
        console.log(web3);

        if (loginStatus) {
          onClose();

          const patient = await recordFactory.methods
            .getPatientData()
            .call({ from: account });

          sessionStorage.setItem("patient", patient);

          console.log(patient);

          navigate("homePage");
        } else {
          setErrorMessage("Password is not correct!");
        }
      } catch (error) {
        console.error("Error during login process:", error);
      }
    }
  };

  return (
    <div className="create-new-client-modal">
      <div className="modal-content">
        <input
          className="modal-input account-input"
          name="patient_account"
          value={account}
          disabled
        />
        <input
          className="modal-input password-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button className="modal-button" onClick={handleSubmit}>
          <span className="box">Log in</span>
        </button>
        <div className="close-button" onClick={onClose}>
          <div class="close-container">
            <div class="leftright"></div>
            <div class="rightleft"></div>
            <label class="close">close</label>
          </div>
        </div>
        {/* <button className="modal-button cancel-button" onClick={onClose}>
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default Login;
