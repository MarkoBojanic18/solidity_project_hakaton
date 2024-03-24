import React, { useState, useEffect } from "react";
import PatientABI from "../../contracts/Patient.json";
import "./ServicePanel.css";

const ServicePanelHealthInsurance = ({ web3 }) => {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const patient = sessionStorage.getItem("patient");

  const loadHealthInsurances = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const healthInsurancesFromContract = await patientFactory.methods
        .getInsurancesList()
        .call();
      console.log(healthInsurancesFromContract);
      setHealthInsurances(healthInsurancesFromContract);
    } catch (error) {
      console.error(
        "Error while loading health insurances for patient:",
        error
      );
    }
  };

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

  const sortedHealthInsurances = [...healthInsurances].sort((a, b) => {
    if (sortCriteria === "typeOfInsurance") {
      return sortDirection === "asc"
        ? a.typeOfInsurance.localeCompare(b.typeOfInsurance)
        : b.typeOfInsurance.localeCompare(a.typeOfInsurance);
    } else if (sortCriteria === "insuranceCoverage") {
      return sortDirection === "asc"
        ? a.insuranceCoverage.localeCompare(b.insuranceCoverage)
        : b.insuranceCoverage.localeCompare(a.insuranceCoverage);
    } else if (sortCriteria === "insuranceIsPaid") {
      return sortDirection === "asc"
        ? a.insuranceIsPaid.localeCompare(b.insuranceIsPaid)
        : b.insuranceIsPaid.localeCompare(a.insuranceIsPaid);
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  useEffect(() => {
    if (web3) {
      loadHealthInsurances();
    }
  }, [web3]);

  return (
    <div className="client-list">
      <h1 className="client-list-title">ALL Health Insurances of Patient</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("typeOfInsurance")}>
              Type of health insurance{" "}
              {sortCriteria === "typeOfInsurance" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "typeOfInsurance" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
            <th onClick={() => sortBy("insuranceCoverage")}>
              Type of health insurance{" "}
              {sortCriteria === "insuranceCoverage" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "insuranceCoverage" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
            <th onClick={() => sortBy("insuranceIsPaid")}>
              Insurance is paid{" "}
              {sortCriteria === "insuranceIsPaid" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "insuranceIsPaid" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedHealthInsurances.map((healthInsur, index) => (
            <tr key={index}>
              <td>{healthInsur.typeOfInsurance}</td>
              <td>{healthInsur.insuranceCoverage}</td>
              <td>
                {Number(healthInsur.insuranceIsPaid) === 0
                  ? "Not paid"
                  : "Paid"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicePanelHealthInsurance;
