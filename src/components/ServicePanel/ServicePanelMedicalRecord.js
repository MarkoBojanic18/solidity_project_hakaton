import React, { useEffect, useState } from "react";

import RecordFactoryABI from "../../contracts/RecordFactory.json";
import PatientABI from "../../contracts/Patient.json";
import MedicalRecordABI from "../../contracts/MedicalRecord.json";
import medicalRecordsFactoryABI from "../../contracts/MedicalRecordFactory.json";

import NavbarHomePage from "../NavbarHomePage/NavbarHomePage";
import ServicesList from "../servicesList/ServicesList";
import MedicalRecordDetailsModal from  "../medicalRecord/MedicalRecordDetailsModal.js";
import "./ServicePanel.css";





function ServicePanelMedicalRecord ({RecordFactoryAddress,MedicalRecordFactoryAddress,patient_account,web3,onClose}) {


  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedicalRecord, setselectedMedicalRecord] = useState(null);



  useEffect(() => {
       loadPatientRecords();

  }, []);

  const openDetailsModal = (medRec) => {
    setselectedMedicalRecord(medRec);
  };


  const loadPatientRecords = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!web3 || !patient_account) {
      alert("Web3 instance or account is not available.");
      return;
    }

    try {
      if (web3 && patient_account) {
      
        const medicalRecordsFactorycontract = new web3.eth.Contract(
          medicalRecordsFactoryABI .abi,
          MedicalRecordFactoryAddress
        );
        console.log("Ovde ok");  

 ///prikaz svih izvestaja
       
          const medicalRecordsforPatientAll = await medicalRecordsFactorycontract.methods
            .getMedicalRecordsForPatient()
            .call({ from: patient_account });

          setMedicalRecords(medicalRecordsforPatientAll);
          console.log(medicalRecords)

        }

 
    } catch (error) {
        console.error("Error during loading medical records:", error);
      }
    };



  


  return (
    <div className="panel">
     {medicalRecords.map((medRec, index) => (
        <div
          key={index}
          className="client-item"
          onClick={() => openDetailsModal(medRec)}
        >
          {index + 1}
        </div>
      ))}
      {selectedMedicalRecord && (
        <MedicalRecordDetailsModal
        selectedMedicalRecord={selectedMedicalRecord}
        web3={web3}
          patient_account={patient_account}
          RecordFactoryAddress={RecordFactoryAddress}
          MedicalRecordFactoryAddress={MedicalRecordFactoryAddress}
          onClose={() => setselectedMedicalRecord(null)}
        />
      )}
    </div>
  );
}

export default ServicePanelMedicalRecord;
