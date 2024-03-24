import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarHomePage from "../NavbarHomePage/NavbarHomePage";
import ServicesList from "../servicesList/ServicesList";
import ServicePanel from "../ServicePanel/ServicePanel";
import "./HomePage.css";
import UserModal from "../UserModal/UserModal";
import Web3 from "web3";
import PatientABI from "../../contracts/Patient.json";
import BlankPanel from "../BalnkPanel/BlankPanel.js";

function HomePage() {
  const patient = sessionStorage.getItem("patient");
  const RecordFactoryAddress = sessionStorage.getItem("RecordFactoryAddress");
  const MedicalRecordFactoryAddress = sessionStorage.getItem(
    "MedicalRecordFactoryAddress"
  );

  const [patient_account, setPatientAccount] = useState("");
  const [first_name, setPatientFirstName] = useState("");
  const [last_name, setPatientLastName] = useState("");
  const [password, setPatientPassword] = useState("");
  const [gender, setPatientGender] = useState("");
  const [height, setPatientHeight] = useState("");
  const [weight, setPatientWeight] = useState("");
  const [bloodType, setPatientBloodType] = useState("");
  const [year_of_birth, setPatientYearOfBirth] = useState("");
  const [unique_in, setPatientUniqueIN] = useState("");
  const [donor, setDonor] = useState(false);

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

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

  const loadPatientData = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!web3 || !patient) {
      alert("Web3 instance or account is not available.");
      return;
    }

    try {
      if (web3 && patient) {
        const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

        const patient_account1 = await patientContract.methods
          .getPatienceAccount()
          .call();
        const first_name1 = await patientContract.methods
          .getPatienceFirstName()
          .call();
        const last_name1 = await patientContract.methods
          .getPatienceLastName()
          .call();
        const password1 = await patientContract.methods
          .getPatiencePassword()
          .call();
        const gender1 = await patientContract.methods
          .getPatienceGender()
          .call();
        const year_of_birth1 = await patientContract.methods
          .getPatienceYearOfBirth()
          .call();
        const bloodType1 = await patientContract.methods.getBloodType().call();
        const height1 = await patientContract.methods.getHeight().call();
        const weight1 = await patientContract.methods.getWeight().call();
        const unique_in1 = await patientContract.methods
          .getUniqueIdentificationNumber()
          .call();
        const donor1 = await patientContract.methods.getDonor().call();

        console.log(donor1);

        setPatientAccount(patient_account1);
        setPatientFirstName(first_name1);
        setPatientLastName(last_name1);
        setPatientPassword(password1);
        setPatientGender(gender1);
        setPatientYearOfBirth(year_of_birth1);
        setPatientHeight(height1);
        setPatientWeight(weight1);
        setPatientBloodType(bloodType1);
        setDonor(donor1 + "");
        setPatientUniqueIN(unique_in1);
      }
    } catch (error) {
      console.error("Error during loading pacient data:", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
    connectWallet();

    if (patient === "" || patient === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="home-page">
      <NavbarHomePage
        // sendDataToParent={handleDataFromNavbar}
        patient_account={patient_account}
        first_name={first_name}
        last_name={last_name}
        password={password}
        gender={gender}
        year_of_birth={year_of_birth}
        unique_in={unique_in}
        bloodType={bloodType}
        height={height}
        weight={weight}
        donor={donor}
        loadPatientData={loadPatientData}
      />
      <div className="services-container">
        <ServicesList
          RecordFactoryAddress={RecordFactoryAddress}
          MedicalRecordFactoryAddress={MedicalRecordFactoryAddress}
          patient_account={patient_account}
          web3={web3}
        ></ServicesList>
        <BlankPanel></BlankPanel>
      </div>
    </div>
  );
}

export default HomePage;
