import React, { useEffect, useState } from "react";
import "./ServicePanel.css";
import RecordFactoryABI from "../../contracts/RecordFactory.json";
import PatientABI from "../../contracts/Patient.json";
import ImmunisationDetailsModal from  "../immunisation/ImmunisationDetailsModal.js";




function ServicePanelImunnisation({RecordFactoryAddress,MedicalRecordFactoryAddress,patient_account,web3,onClose}) {

    const [immunisations, setImmunisations] = useState([]);
    const [selectedImmunisation, setSelectedImmunisation] = useState(null);
    
  
    useEffect(() => {
         loadPatientVaccines();
  
    }, []);
  
 
  
  
    const loadPatientVaccines = async () => {
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
        
            const patientContract = new web3.eth.Contract(PatientABI.abi, patient_account);
            console.log("Izadje iz patient contract")
  
            const immunisationsForPatient = await patientContract.methods
              .getImmunisationList()
              .call();
              console.log("Greska")
            setImmunisations(immunisationsForPatient);
            console.log(immunisations);
          }
  
   
      } catch (error) {
          console.error("Error during loading medical records:", error);
        }
      };
  
      const openDetailsModal = (immunisation) => {
        setSelectedImmunisation(immunisation);
      };
  

  return (
      <div className="panel">
     {immunisations.map((oneimmunisation, index) => (
        <div
          key={index}
          className="client-item"
        >
          {index + 1}
        </div>
      ))}
      {selectedImmunisation && (
        < ImmunisationDetailsModal
        selectedImmunisation={selectedImmunisation}
        web3={web3}
        patient_account={patient_account}
        RecordFactoryAddress={RecordFactoryAddress}
        MedicalRecordFactoryAddress={MedicalRecordFactoryAddress}
        onClose={() => setImmunisations(null)}
      />
      )}

    </div>
  )
}

export default ServicePanelImunnisation
