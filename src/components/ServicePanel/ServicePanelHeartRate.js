import React, { useState, useEffect } from "react";
import "./ServicePanel.css";

const ServicePanelHeartRate = (props) => {
  const [heartRate, setHeartRate] = useState(null);
  const [heartRates, setHeartRates] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const patient = sessionStorage.getItem("patient");

  useEffect(() => {}, []);

  const measureHeartRate = () => {
    setTimeout(() => {
      // Generate a random fake heart rate value between 60 and 100 bpm
      setHeartRate(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
      setButtonIsClicked(false);
    }, 5000); // Display after 5 seconds
  };

  const measureAgain = () => {
    setButtonIsClicked(true);
    setHeartRate(null);
    setHeartRates([]);
    setIsSaved(false);
    measureHeartRate();
  };

  const saveHeartRate = () => {
    if (!isSaved && heartRate !== null) {
      // Simulating saving heart rate to an array (replace with actual saving logic)
      setHeartRates([
        ...heartRates,
        { value: heartRate, timestamp: new Date() },
      ]);
      setIsSaved(true);
      showToast("Heart rate saved successfully");
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
          <button className="button-measure" onClick={measureAgain}>
            Measure Heart Rate
          </button>
          <button className="button-measure" onClick={saveHeartRate}>
            Save
          </button>
          <button className="button-measure">Show history</button>
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
    </div>
  );
};

export default ServicePanelHeartRate;
