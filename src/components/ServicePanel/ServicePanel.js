import React, { useEffect, useState } from "react";
import "./ServicePanel.css";
import RecordFactoryABI from "../../contracts/RecordFactory.json";


function ServicePanel({props}) {

  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    loadPatientRecords();
  }, []);

  const loadPatientRecords = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!props.web3 || !props.patient_account) {
      alert("Web3 instance or account is not available.");
      return;
    }

    try {
      if (props.web3 && props.patient_account) {

        const recordFactory = new props.web3.eth.Contract(
          RecordFactoryABI.abi,
          props.RecordFactoryAddress
        );

        var  medicalRecords  = await recordFactory.methods
            .getMedicalRecordsForPatient()
            .call({ from: props.account });

        setMedicalRecords(medicalRecords);


      }
    } catch (error) {
      console.error("Error during loading medical records:", error);
    }
  };

  return (
    <div className="panel">
      <h2>Medical Records</h2>
      <ul>
        {medicalRecords.map((record, id) => (
          <li key={id}>{record} onclick={}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServicePanel;
