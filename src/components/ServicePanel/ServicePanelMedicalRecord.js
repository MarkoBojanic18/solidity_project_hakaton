import React, { useState, useEffect } from "react";
import PatientABI from "../../contracts/Patient.json";
import "./ServicePanel.css";
import MedicalRecordDetailsModal from "../medicalRecord/MedicalRecordDetailsModal.js";

const ServicePanelMedicalRecord = ({
  web3,
  patient_account,
  RecordFactoryAddress,
}) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const patient = sessionStorage.getItem("patient");

  const loadMedicalRecords = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const medicalRecordsFromContract = await patientFactory.methods
        .getAllMedicalRecords()
        .call();
      console.log(medicalRecordsFromContract);
      setMedicalRecords(medicalRecordsFromContract);
    } catch (error) {
      console.error("Error while loading medical records for patient:", error);
    }
  };

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

  const sortBy = (key) => {
    if (sortCriteria === key) {
      // If already sorting by the same criteria, reverse direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new criteria, set the criteria and direction
      setSortCriteria(key);
      setSortDirection("asc");
    }
  };

  const sortedMedicalRecords = [...medicalRecords].sort((a, b) => {
    if (sortCriteria === "typeOfRecord") {
      return sortDirection === "asc"
        ? a.typeOfRecord.localeCompare(b.typeOfRecord)
        : b.typeOfRecord.localeCompare(a.typeOfRecord);
    } else if (sortCriteria === "date") {
      return sortDirection === "asc"
        ? new Date(Number(a.date_time_of_record)) -
            new Date(Number(b.date_time_of_record))
        : new Date(Number(b.date_time_of_record)) -
            new Date(Number(a.date_time_of_record));
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  const openDetailsModal = (medicalRecord) => {
    setSelectedMedicalRecord(medicalRecord);
  };

  useEffect(() => {
    if (web3) {
      loadMedicalRecords();
    }
  }, [web3]);

  return (
    <div className="client-list">
      <h1 className="client-list-title">Medical Records</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("typeOfRecord")}>
              Diagnosis{" "}
              {sortCriteria === "typeOfRecord" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "typeOfRecord" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
            <th onClick={() => sortBy("date")}>
              Date {sortCriteria === "date" && sortDirection === "asc" && "↑"}
              {sortCriteria === "date" && sortDirection === "desc" && "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMedicalRecords.map((medicalRecord, index) => (
            <tr key={index}>
              <td>{medicalRecord.typeOfRecord}</td>
              <td>{formatDate(Number(medicalRecord.date_time_of_record))}</td>
                <button className="change-button button2" onClick={() => openDetailsModal(medicalRecord)}>
                  change
                </button>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMedicalRecord && (
        <MedicalRecordDetailsModal
          web3={web3}
          patient_account={patient_account}
          medicalRecord={selectedMedicalRecord}
          onClose={() => setSelectedMedicalRecord(null)}
          recordFactoryAddress={RecordFactoryAddress}
        />
      )}
    </div>
  );
};

export default ServicePanelMedicalRecord;
