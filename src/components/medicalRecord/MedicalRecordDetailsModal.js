import React, { useState } from "react";
import RecordFactoryABI from "../../contracts/RecordFactory.json";
import "./MedicalRecordDetailsModal.css";

const MedicalRecordDetailsModal = ({
  onClose,
  web3,
  patient_account,
  medicalRecord,
  recordFactoryAddress,
}) => {
  const [medicalReordData, setMedicalRecordData] = useState({
    id: Number(medicalRecord.id),
    doctorWhoCanSeeRecipe: medicalRecord.doctorWhoCanSeeRecipe,
  });

  function formatDate(_date) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = _date * 1000;

    // Create a new Date object with the converted milliseconds
    const dateObject = new Date(milliseconds);

    // Extract individual date and time components
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    const date_time = date + " " + time;

    return date_time;
  }

  const handleChange = (e) => {
    setMedicalRecordData({
      ...medicalReordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!web3 || !patient_account) {
      alert("Web3 instance or account is not available.");
      return;
    }
    try {
      const recordFactory = new web3.eth.Contract(
        RecordFactoryABI.abi,
        recordFactoryAddress
      );

      const transactionParameters = {
        to: recordFactoryAddress,
        from: patient_account, // must match user's active address
        data: recordFactory.methods
          .changeMedicalRecordForPatient(
            medicalReordData.id,
            medicalReordData.doctorWhoCanSeeRecipe
          )
          .encodeABI({ from: patient_account }),
      }; // call to contract method

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);

      console.log(expenseData);

      onClose();
    } catch (error) {
      console.error("Error during changing medical record", error);
    }
  };

  return (
    <div>
      <div className="client-details-modal">
        <h2 className="modal-title">Medical Record Details</h2>

        <p className="client-info">Patient address: {patient_account}</p>
        <table>
          <tbody>
            <tr>
              <td>Record id:</td>
              <td>{Number(medicalRecord.id)}</td>
            </tr>
            <tr>
              <td>Patient:</td>
              <td>{medicalRecord.patient}</td>
            </tr>
            <tr>
              <td>Type of record:</td>
              <td>{medicalRecord.typeOfRecord}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{medicalRecord.description}</td>
            </tr>
            <tr>
              <td>Recipe:</td>
              <td>{medicalRecord.recipe}</td>
            </tr>
            <tr>
              <td>Date of record:</td>
              <td>{formatDate(Number(medicalRecord.date_time_of_record))}</td>
            </tr>
            <tr>
              <td>Doctor writing this report</td>
              <td>{medicalRecord.doctorSignature}</td>
            </tr>

            <input
              className="modal-input"
              name="doctorWhoCanSeeRecipe"
              placeholder="Enter a doctor who can access receipe"
              onChange={handleChange}
            />
          </tbody>
        </table>

        <button className="close-button" onClick={handleSubmit}>
          Save
        </button>
        <button className="close-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordDetailsModal;
