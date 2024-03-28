import PressureAnimation from "../../components/assets/servicesIcons/Animation3.gif";
import Animation2 from "../../components/assets/servicesIcons/Animation - Beat.gif";
import React, { useState, useEffect } from "react";
import "./ServicePanel.css";
import PatientABI from "../../contracts/Patient.json";
import MedicalPersonFactoryABI from "../../contracts/MedicalPersonFactory.json";
import "./ServicePanel.css";

const ServicePanelMeasurePressure = ({
  web3,
  patient_account,
  RecordFactoryAddress,
}) => {
  const [bodyPressure, setBodyPressure] = useState(null);
  const [bodyPressures, setBodyPressures] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const patient = sessionStorage.getItem("patient");
  const [bodyPressureHistory, setBodyPressureHistory] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {}, []);

  const measureBodyPressure = () => {
    setTimeout(() => {
      // Generate random fake body pressure values for systolic and diastolic pressure
      const systolic = Math.floor(Math.random() * (150 - 100 + 1)) + 100;
      const diastolic = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
      setBodyPressure({ systolic, diastolic });
      setButtonIsClicked(false);
    }, 5000); // Display after 5 seconds
  };

  const measureAgain = () => {
    setButtonIsClicked(true);
    setBodyPressure(null);
    setBodyPressures([]);
    setIsSaved(false);
    measureBodyPressure();
  };

  const showHistory = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const historyRecordsFromContract = await patientFactory.methods
        .getBloodPressureList()
        .call();
      console.log(historyRecordsFromContract);
      setBodyPressureHistory(historyRecordsFromContract);
    } catch (error) {
      console.error(
        "Error while loading body pressure history for patient:",
        error
      );
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

  const sortedBodyPressureHistory = [...bodyPressureHistory].sort((a, b) => {
    if (sortCriteria === "systolic") {
      return sortDirection === "asc"
        ? Number(a.systolic) - Number(b.systolic)
        : Number(b.systolic) - Number(a.systolic);
    } else if (sortCriteria === "diastolic") {
      return sortDirection === "asc"
        ? Number(a.diastolic) - Number(b.diastolic)
        : Number(b.diastolic) - Number(a.diastolic);
    } else if (sortCriteria === "date_time") {
      return sortDirection === "asc"
        ? Number(a.date_time) - Number(b.date_time)
        : Number(b.date_time) - Number(a.date_time);
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  const saveBodyPressure = async () => {
    if (bodyPressure == null) {
      alert("You must first measure blood pressure");
    }
    if (!isSaved && bodyPressure !== null) {
      // Simulating saving body pressure to an array (replace with actual saving logic)
      setBodyPressures([
        ...bodyPressures,
        {
          systolic: bodyPressure.systolic,
          diastolic: bodyPressure.diastolic,
          timestamp: new Date(),
        },
      ]);

      try {
        const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

        const transactionParameters = {
          to: patient,
          from: patient_account, // must match user's active address
          data: patientContract.methods
            .addBloodPressureToTheList(
              bodyPressure.systolic,
              bodyPressure.diastolic
            )
            .encodeABI({ from: patient_account }),
        }; // call to contract method

        // txHash is a hex string
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log("Transaction Hash:", txHash);

        setIsSaved(true);
        showToast("Body pressure saved successfully");
      } catch (error) {
        console.error("Error during saving body pressure", error);
      }
    }
  };

  const showToast = (message) => {
    // Implement your toast notification logic here
    console.log(message);
  };

  return (
    <div className="container_measure">
      <div className="measure-wrapper">
        <h1>Measure your body pressure</h1>

        <img src={Animation2}></img>

        <div className="body-pressure-display">
          {!buttonIsClicked ? (
            bodyPressure !== null ? (
              <p>
                Systolic: {bodyPressure.systolic} mmHg, Diastolic:{" "}
                {bodyPressure.diastolic} mmHg
              </p>
            ) : (
              <p>...</p>
            )
          ) : (
            <p>Measuring...</p>
          )}
        </div>
        <div className="button-group-measure">
          <button className="button-measure measure-btn" onClick={measureAgain}>
            Measure Blood Pressure
          </button>

          <button
            className="button-measure save-measure-btn"
            onClick={saveBodyPressure}
          >
            Save
          </button>
          <button className="button-measure history-btn" onClick={showHistory}>
            Show history
          </button>
        </div>
      </div>

      {bodyPressures.length > 0 && (
        <ul className="ul-measure">
          {bodyPressures.map((pressure, index) => (
            <li key={index}>
              Systolic: {pressure.systolic} mmHg, Diastolic:{" "}
              {pressure.diastolic} mmHg - {pressure.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("systolic")}>
              Systolic{" "}
              {sortCriteria === "systolic" && sortDirection === "asc" && "↑"}
              {sortCriteria === "systolic" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("diastolic")}>
              Diastolic{" "}
              {sortCriteria === "diastolic" && sortDirection === "asc" && "↑"}
              {sortCriteria === "diastolic" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("date_time")}>
              Date{" "}
              {sortCriteria === "date_time" && sortDirection === "asc" && "↑"}
              {sortCriteria === "date_time" && sortDirection === "desc" && "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBodyPressureHistory.map((BP, index) => (
            <tr key={index}>
              <td>{Number(BP.systolic)}</td>
              <td>{Number(BP.diastolic)}</td>
              <td>{formatDate(Number(BP.date_time))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicePanelMeasurePressure;
