import React, { useState, useEffect } from "react";
import "./ServicePanel.css";
import PatientABI from "../../contracts/Patient.json";
import MedicalPersonFactoryABI from "../../contracts/MedicalPersonFactory.json";

const ServicePanelHeartRate = ({
  web3,
  patient_account,
  RecordFactoryAddress,
}) => {
  const [heartRate, setHeartRate] = useState(0);
  const [heartRates, setHeartRates] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const patient = sessionStorage.getItem("patient");
  const [heartRatesHistory, setHeartRatesHistory] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {}, []);

  const measureHeartRate = () => {
    setTimeout(() => {
      // Generate a random fake heart rate value between 60 and 100 bpm
      setHeartRate(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
      setButtonIsClicked(false);
    }, 5000); // Display after 5 seconds
  };

  const showHistory = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const historyRecordsFromContract = await patientFactory.methods
        .getHeartRateList()
        .call();
      console.log(historyRecordsFromContract);
      setHeartRatesHistory(historyRecordsFromContract);
    } catch (error) {
      console.error(
        "Error while loading heart rate history for patient:",
        error
      );
    }
  };

  const measureAgain = () => {
    setButtonIsClicked(true);
    setHeartRate(0);
    setHeartRates([]);
    setIsSaved(false);
    measureHeartRate();
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

  const sortedHeartRatesHistory = [...heartRatesHistory].sort((a, b) => {
    if (sortCriteria === "rate") {
      return sortDirection === "asc"
        ? Number(a.rate) - Number(b.rate)
        : Number(b.rate) - Number(a.rate);
    } else if (sortCriteria === "date_time") {
      return sortDirection === "asc"
        ? Number(a.date_time) - Number(b.date_time)
        : Number(b.date_time) - Number(a.date_time);
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  const saveHeartRate = async () => {
    if (heartRate == 0) {
      alert("You must first measure heart rate");
    }
    if (!isSaved && heartRate !== 0) {
      // Simulating saving heart rate to an array (replace with actual saving logic)
      setHeartRates([
        ...heartRates,
        { value: heartRate, timestamp: new Date() },
      ]);

      try {
        const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

        const transactionParameters = {
          to: patient,
          from: patient_account, // must match user's active address
          data: patientContract.methods
            .addHeartRateToTheList(heartRate)
            .encodeABI({ from: patient_account }),
        }; // call to contract method

        // txHash is a hex string
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log("Transaction Hash:", txHash);

        setIsSaved(true);
        showToast("Heart rate saved successfully");
      } catch (error) {
        console.error("Error during saving heart rate", error);
      }
    }
  };

  const showToast = (message) => {
    // Implement your toast notification logic here
    console.log(message);
  };

  return (
    <div className="container_measure">
      <div>
        <h1>Measure your heart rate</h1>
        <div className="heart-icon">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
              fill="red"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="heart-rate-display">
          <p>
            {!buttonIsClicked
              ? heartRate !== null
                ? `${heartRate} bpm`
                : "..."
              : "Measuring..."}
          </p>
        </div>
        <div className="button-group-measure">
          <button className="button-measure measure-btn" onClick={measureAgain}>
            Measure Heart Rate
          </button>
          <button
            className="button-measure save-measure-btn"
            onClick={saveHeartRate}
          >
            Save
          </button>
          <button className="button-measure history-btn" onClick={showHistory}>
            Show history
          </button>
        </div>
      </div>

      {heartRates.length > 0 && (
        <ul className="ul-measure">
          {heartRates.map((rate, index) => (
            <li key={index}>
              {rate.value} bpm - {rate.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("rate")}>
              Heart Rate{" "}
              {sortCriteria === "rate" && sortDirection === "asc" && "↑"}
              {sortCriteria === "rate" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("date_time")}>
              Date{" "}
              {sortCriteria === "date_time" && sortDirection === "asc" && "↑"}
              {sortCriteria === "date_time" && sortDirection === "desc" && "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedHeartRatesHistory.map((HR, index) => (
            <tr key={index}>
              <td>{Number(HR.rate)}</td>
              <td>{formatDate(Number(HR.date_time))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicePanelHeartRate;
