import React, { useEffect, useState } from "react";

import RecordFactoryABI from "../../contracts/RecordFactory.json";
import PatientABI from "../../contracts/Patient.json";
import medicalRecordsFactoryABI from "../../contracts/MedicalRecordFactory.json";

import NavbarHomePage from "../NavbarHomePage/NavbarHomePage";

import "./ServicePanel.css";

function ServicePanelMedicine({ web3, patient_account, RecordFactoryAddress }) {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const patient = sessionStorage.getItem("patient");
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadPatientRecepies();
  }, []);

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

  const sortedMedicines = [...medicines].sort((a, b) => {
    if (sortCriteria === "recipe") {
      return sortDirection === "asc"
        ? a.recipe.localeCompare(b.recipe)
        : b.recipe.localeCompare(a.recipe);
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  const loadPatientRecepies = async () => {
    try {
      const patientFactory = new web3.eth.Contract(PatientABI.abi, patient);

      const medicalRecordsFromContract = await patientFactory.methods
        .getAllMedicalRecords()
        .call();

      const recordsWithRecipes = medicalRecordsFromContract.filter(
        (record) => record.recipe !== ""
      );

      const recipesAndDates = recordsWithRecipes.map((record) => {
        const date = new Date(Number(record.date_time_of_record) * 1000);
        return {
          recipe: record.recipe,
          date: date, // F.toLocaleDateString()
        };
      });
      setMedicines(recipesAndDates);

      console.log("Recipes and Dates:", recipesAndDates);
    } catch (error) {
      console.error("Error while loading medical records for patient:", error);
    }
  };

  return (
    <div className="client-list">
      <h1 className="client-list-title">Medical Records</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("recipe")}>
              Medicines{" "}
              {sortCriteria === "recipe" && sortDirection === "asc" && "↑"}
              {sortCriteria === "recipe" && sortDirection === "desc" && "↓"}
            </th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sortedMedicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.recipe}</td>
              <td>{medicine.date.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicePanelMedicine;
