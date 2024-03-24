import React, { useEffect, useState } from "react";

import RecordFactoryABI from "../../contracts/RecordFactory.json";
import PatientABI from "../../contracts/Patient.json";
import medicalRecordsFactoryABI from "../../contracts/MedicalRecordFactory.json";

import NavbarHomePage from "../NavbarHomePage/NavbarHomePage";

import "./ServicePanel.css";

function ServicePanelMedicine({RecordFactoryAddress,MedicalRecordFactoryAddress,patient_account,web3,onClose}) {

    const [medicines, setMedicines] = useState([]);
    
  
    useEffect(() => {
         loadPatientRecepies();
  
    }, []);
  
 
  
  
    const loadPatientRecepies = async () => {
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
  
   ///prikaz svih recepata kao stringova
          console.log(patient_account);  
  
         
            const listOfRecepiesForPateint = await medicalRecordsFactorycontract.methods
              .returnAllRecipesOfPatient() 
              .call({ from: patient_account });
  
            setMedicines(listOfRecepiesForPateint);
            console.log(listOfRecepiesForPateint)
  
          }
  
   
      } catch (error) {
          console.error("Error during loading medical records:", error);
        }
      };
  
  
  

  return (
      <div className="panel">
     {medicines.map((medicine, index) => (
        <div
          key={index}
          className="client-item"
        >
          {index + 1}
        </div>
      ))}

    </div>
  )
}

export default ServicePanelMedicine
