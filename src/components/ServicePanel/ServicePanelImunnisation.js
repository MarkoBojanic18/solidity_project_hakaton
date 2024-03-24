import React, { useState, useEffect } from "react";
import PatientABI from "../../contracts/Patient.json";
import "./ServicePanel.css";

const ServicePanelImunnisation = ({ web3 }) => {
  const [immunisations, setImmunisations] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const patient = sessionStorage.getItem("patient");

  const loadImmunisations = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const immunisationsFromContract = await patientFactory.methods
        .getImmunisationList()
        .call();
      console.log(immunisationsFromContract);
      setImmunisations(immunisationsFromContract);
    } catch (error) {
      console.error("Error while loading immunisations for patient:", error);
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

  const sortedImmunisations = [...immunisations].sort((a, b) => {
    if (sortCriteria === "typeOfImmun") {
      return sortDirection === "asc"
        ? a.typeOfRecord.localeCompare(b.typeOfImmun)
        : b.typeOfRecord.localeCompare(a.typeOfImmun);
    } else if (sortCriteria === "date_time_of_imun") {
      return sortDirection === "asc"
        ? new Date(Number(a.date_time_of_imun)) -
            new Date(Number(b.date_time_of_imun))
        : new Date(Number(b.date_time_of_imun)) -
            new Date(Number(a.date_time_of_imun));
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  useEffect(() => {
    if (web3) {
      loadImmunisations();
    }
  }, [web3]);

  return (
    <div className="client-list">
      <h1 className="client-list-title">ALL Immunisations of Patient</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("typeOfImmun")}>
              Type of immunisation{" "}
              {sortCriteria === "typeOfImmun" && sortDirection === "asc" && "↑"}
              {sortCriteria === "typeOfImmun" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
            <th onClick={() => sortBy("date_time_of_imun")}>
              Date{" "}
              {sortCriteria === "date_time_of_imun" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "date_time_of_imun" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedImmunisations.map((immunisation, index) => (
            <tr key={index}>
              <td>{immunisation.typeOfImmun}</td>
              <td>{formatDate(Number(immunisation.date_time_of_imun))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicePanelImunnisation;
