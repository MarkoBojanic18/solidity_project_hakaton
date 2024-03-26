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
  const [datum, setDatum] = useState("");
  const [diagnosesList, setDiagnosesList] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("A0102");

  const fetchDiagnosesList = async () => {
    const someDiagnoses = [
      "AO53 - Intoxicatio alimentaria per Vibrionem parahaemolyticam",
      "A25 - Febris post morsum muris",
      "A923 - Febris West Nile",
      "F321 - Episodium depressivum, gradus moderat",
      "Z010 - Examination of ears and hearing",
      "J00 - Nasopharyngitis acuta",
      "A220 - Anthrax cutaneus",
    ];
    setDiagnosesList(someDiagnoses);
  };

  useEffect(() => {
    fetchDiagnosesList();
  }, []);

  //
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

  ///
  const loadMedicalRecordsByDiagnosis = async () => {
    if (selectedDiagnosis == "") {
      <p> Izaberite dijagnozu </p>;
    }
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const medicalRecordsByDiagnosisFromContract = await patientFactory.methods
        .getMedicalRecordByDaignose(selectedDiagnosis)
        .call();
      console.log(medicalRecordsByDiagnosisFromContract);
      setMedicalRecords(medicalRecordsByDiagnosisFromContract);
    } catch (error) {
      console.error("Error while loading medical records for patient:", error);
    }
  };

  //
  const loadMedicalRecordsByDate = async () => {
    if (!datum) {
      alert("You must choose date");
      return;
    }

    const selectedDate = new Date(datum);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Date must be in past or today");
      return;
    }
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const medicalRecordsFromContract = await patientFactory.methods
        .getAllMedicalRecords()
        .call();

      const medicalRecordsFilteredByDate = medicalRecordsFromContract.filter(
        (medicalRecord) => {
          // Pretvoriti datum zapisa iz timestamp-a u Date objekat
          const recordDate = new Date(
            Number(medicalRecord.date_time_of_record) * 1000
          );
          console.log(recordDate);
          console.log(selectedDate.toDateString());
          // Provera da li je datum zapisa jednak izabranom datumu
          return recordDate.toDateString() === selectedDate.toDateString();
        }
      );

      console.log(medicalRecordsFilteredByDate);
      setMedicalRecords(medicalRecordsFilteredByDate);
    } catch (error) {
      console.error("Error while loading medical records for patient:", error);
    }
  };

  /// fje kad se klikne na dugme
  const handleSubmitAllRecords = async () => {
    loadMedicalRecords();
  };

  const handleSubmitDate = async () => {
    try {
      loadMedicalRecordsByDate();
    } catch (error) {
      console.error("Error while fetching medical records by date:", error);
    }
  };

  const handleSubmitDiagnosis = async () => {
    try {
      loadMedicalRecordsByDiagnosis();
    } catch (error) {
      console.error("Error while fetching medical records by date:", error);
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

  return (
    <div className="client-list">
      <h1 className="client-list-title">Medical Records</h1>
      <label htmlFor="calendar">Choose date:</label>
      <input
        type="date"
        id="calendar"
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
      />

      <select
        value={selectedDiagnosis}
        onChange={(e) => setSelectedDiagnosis(e.target.value)}
      >
        {diagnosesList.map((diagnosis, index) => (
          <option key={index} value={diagnosis}>
            {diagnosis}
          </option>
        ))}
      </select>

      <button className="modal-button" onClick={handleSubmitDate}>
        <span className="box">Show records by date</span>
      </button>
      <button className="modal-button" onClick={handleSubmitDiagnosis}>
        <span className="box">Show records by diagnosis</span>
      </button>
      <button className="modal-button" onClick={handleSubmitAllRecords}>
        <span className="box">Show all records</span>
      </button>
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
              <button
                className="change-button button2"
                onClick={() => openDetailsModal(medicalRecord)}
              >
                Details
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
