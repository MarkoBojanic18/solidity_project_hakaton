import PressureAnimation from "../../components/assets/servicesIcons/Animation3.gif";
import Animation2 from "../../components/assets/servicesIcons/Animation - Beat.gif";
import React, { useState, useEffect } from "react";
import "./ServicePanel.css";
import PatientABI from "../../contracts/Patient.json";
import MedicalPersonFactoryABI from "../../contracts/MedicalPersonFactory.json";
import "./ServicePanel.css";


const ServicePanelMeasurePressure = ({ web3, patient_account, RecordFactoryAddress }) => {
  const [bodyPressure, setBodyPressure] = useState(null);
  const [bodyPressures, setBodyPressures] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const patient = sessionStorage.getItem("patient");

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

  const saveBodyPressure = async () => {
    if( bodyPressure == null){
      alert ("You must first measure blood pressure")
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

      const patientContract= new web3.eth.Contract(PatientABI.abi, patient);

      const transactionParameters = {
        to: patient,
        from: patient_account, // must match user's active address
        data: patientContract.methods
        . addBloodPressureToTheList(
          bodyPressure.systolic,
          bodyPressure.diastolic,
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
          <button className="button-measure" onClick={measureAgain}>
            Measure Blood Pressure
          </button>
          
          <button className="button-measure" onClick={saveBodyPressure}>
            Save
          </button>
          <button className="button-measure">Show history</button>
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
    </div>
  );
};

export default ServicePanelMeasurePressure;


