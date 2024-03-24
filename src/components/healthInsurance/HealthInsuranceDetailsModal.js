import React from 'react'
import "./HealthInsuranceDetailsModal.css";

function HealthInsuranceDetailsModal({ patient_account, web3, selectedHealthInsurance,RecordFactoryAddress,MedicalRecordFactoryAddress,onClose}) {
    return (
  
        <div className="client-details-modal">
          <h2 className="modal-title">Health insurance Details</h2>
    
          <p className="client-info">Patient address: {patient_account}</p>
          <table>
            <tbody>
              <tr>
                <td>Type of insurance:</td>
                <td>{selectedHealthInsurance.typeOfInsurance}</td>
              </tr>
              <tr>
                <td>Insurance coverage:</td>
                <td>{selectedHealthInsurance.insuranceCoverage}</td>
              </tr>
              <tr>
                <td>Insurance paid?:</td>
                <td>{Number(selectedHealthInsurance.insuranceIsPaid)==0 ? "insurance is not paid":
                "insurance is paid"}</td>
              </tr>
            </tbody>
          </table>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
     
       
    );
    };

export default HealthInsuranceDetailsModal

