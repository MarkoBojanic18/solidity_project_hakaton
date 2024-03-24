import React, { useState, useEffect } from "react";
import "./ImmunisationDetailsModal.css";


const ImmunisationDetailsModal = ({ patient_account, web3, selectedImmunisation,RecordFactoryAddress,MedicalRecordFactoryAddress,onClose}) => {
 

  return (
  
        <div className="client-details-modal">
          <h2 className="modal-title">immunisation Details</h2>

          <p className="client-info">Patient address: {patient_account}</p>
          <table>
            <tbody>
              <tr>
                <td>Type of immunisation:</td>
                <td>{selectedImmunisation.typeOfImmun}</td>
              </tr>
              <tr>
                <td>Date of immunisation:</td>
                <td>{selectedImmunisation.date_time_of_imun}</td>
              </tr>
              
            </tbody>
          </table>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
     
       
  );
};
export default ImmunisationDetailsModal;