import React, { useState, useEffect } from "react";
import "./MedicalRecordDetailsModal.css";
import MedicalRecordABI from "../../contracts/MedicalRecord.json";


const MedicalRecordDetailsModal = ({ patient_account,web3,selectedMedicalRecord, RecordFactoryAddress, MedicalRecordFactoryAddress, onClose }) => {

    const [id, setId] = useState("");
    const [typeOfRecord, setTypeOfRecord] = useState("");
    const [date_time_of_record, setDate_time_of_record] = useState("");
    const [description, setDescription] = useState("");
    const [doctorSignature, setDoctorSignature] = useState("");
    const [recipe, setRecipe] = useState("");
    const [doctorWhoCanSeeRecipe, setDoctorWhoCanSeeRecipe] = useState("");
    const [patient, setpatient] = useState("");

   

    const loadRecordDetails = async () => {
        const medicalRecordContract = new web3.eth.Contract(
            MedicalRecordABI.abi,
            selectedMedicalRecord
        );


        const id1 = await medicalRecordContract.methods.getID().call();
        const typeOfRecord1 = await medicalRecordContract.methods.getTypeOfRecord().call();
        const description1 = await medicalRecordContract.methods.getDescription().call();
        const doctorSignature1 = await medicalRecordContract.methods.getDoctorSignature().call();
        const date_time_of_record1 = await medicalRecordContract.methods.getDateTimeOfRecord().call();
        const recipe1 = await medicalRecordContract.methods.getRecipe().call();
        const patient1 = await medicalRecordContract.methods.getPatient().call();
        const doctorWhoCanSeeRecipe1 = await medicalRecordContract.methods.getDoctorWhoCanSeeRecipe().call();

        setId(id1+"");
      
        setTypeOfRecord(typeOfRecord1);
        setDoctorSignature(doctorSignature1);
        setDate_time_of_record(date_time_of_record1+"");
        setDescription(description1);
        setRecipe(recipe1);
        setpatient(patient1);
        setDoctorWhoCanSeeRecipe(doctorWhoCanSeeRecipe1);

    };

    useEffect(() => {
        loadRecordDetails();
    }, []);



    return (
        <div>

            <div className="client-details-modal">
                <h2 className="modal-title">Medical Record Details</h2>

                <p className="client-info">Patient address: {patient_account}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Record id:</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Patient:</td>
                            <td>{patient}</td>
                        </tr>
                        <tr>
                            <td>Type of record:</td>
                            <td>{typeOfRecord}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <td>Recipe:</td>
                            <td>{recipe}</td>
                        </tr>
                        <tr>
                            <td>Date of record:</td>
                            <td>{date_time_of_record}</td>
                        </tr>
                        <tr>
                            <td>Doctor writing this report</td>
                            <td>{doctorSignature}</td>
                        </tr>

                    </tbody>
                </table>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>

            </div>
        </div>


    );
};



export default MedicalRecordDetailsModal

