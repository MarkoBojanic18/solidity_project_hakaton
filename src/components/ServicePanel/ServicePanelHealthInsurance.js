import React, { useEffect, useState } from "react";
import PatientABI from "../../contracts/Patient.json";
import "./ServicePanel.css";
import HealthInsuranceDetailsModal from  "../healthInsurance/HealthInsuranceDetailsModal.js";


function ServicePanelHealthInsurance({RecordFactoryAddress,MedicalRecordFactoryAddress,patient_account,web3,onClose}) {

    const [healthInsurances, setHealthInsurances] = useState([]);
    const [SelectedHealthInsurance, setSelectedHealthInsurance] = useState(null);
    
  
    useEffect(() => {
         loadPatientHealthInsurance();
  
    }, []);
  
 
  
  
    const  loadPatientHealthInsurance = async () => {
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
        

            const patient1= sessionStorage.getItem("patient");
            //mi pozivamo kontrakt pomocu objekta patient
            const patientContract = new web3.eth.Contract(PatientABI.abi, patient1);
            console.log("Izadje iz patient contract")
  
            const ListOfhealthInsurances = await patientContract.methods
              .getInsurancesList() 
              .call();
              console.log("Greska")
            setHealthInsurances(ListOfhealthInsurances);
            console.log(healthInsurances);
          }
  
   
      } catch (error) {
          console.error("Error during loading medical records:", error);
        }
      };
  
      const openDetailsModal = (healthInsurance) => {
        setSelectedHealthInsurance(healthInsurance);
      };
  


      /*
      {healthInsurances.
            map((healthInsurance, index) => (
              <tr key={index}>
                className="client-item"
                onClick={() => openDetailsModal(healthInsurance)}
                <td>{healthInsurance.typeOfInsurance}</td>
                <td>{formatDate(Number(expense.date))}</td>
              </tr>
             {index + 1}
        </div>
      ))}
      */
  return (
      <div className="panel">

       <table>
        <tbody>
          <tr>
            <td>TypeOfInsurance</td>
            <td>Insurance coverage:</td>
            <td>Insurance paid?:</td>
          </tr>
          {healthInsurances.
            map((healthInsurance, index) => (
              <tr key={index}>
                <td>{healthInsurance.typeOfInsurance}</td>
                <td>{healthInsurance.insuranceCoverage}</td>
                <td>{Number(healthInsurance.insuranceIsPaid)==0 ? "insurance is not paid":
                "insurance is paid"}</td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  )
}

export default ServicePanelHealthInsurance


/*{SelectedHealthInsurance && (
  < HealthInsuranceDetailsModal
  selectedHealthInsurance={SelectedHealthInsurance}
  web3={web3}
  patient_account={patient_account}
  RecordFactoryAddress={RecordFactoryAddress}
  MedicalRecordFactoryAddress={MedicalRecordFactoryAddress}
  onClose={() => setHealthInsurances(null)}
/>
)}*/