import React, { useState, useEffect } from "react";
import PatientABI from "../../contracts/Patient.json";
import MedicalPersonFactoryABI from "../../contracts/MedicalPersonFactory.json";
import "./ServicePanel.css";

function ServicePanelDoctor({ web3, patient_account, RecordFactoryAddress }) {
  const MedicalPersonFactoryAddress = sessionStorage.getItem(
    "MedicalPersonFactoryAddress"
  );
  const [mainDoctor, setMainDoctor] = useState("");

  const [practitioners, setPractitioners] = useState([]);
  const [selectedPractitionerAdress, setSelectedPractitionerAdress] =
    useState(null);
  const [showMainDoctorLabel, setShowMainDoctorLabel] = useState(false);
  ///
  const [allMedicalPersons, setAllMedicalPersons] = useState([]);
  const [selectedMedicalPerson, setselectedMedicalPerson] = useState(null);
  const [excludedMedicalPerson, setselectedExcludedMedicalPerson] =
    useState(null);

  const [allMedicalPersonsWithACCESS, setallMedicalPersonsWithACCESS] =
    useState([]);

  const patient = sessionStorage.getItem("patient");

  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  /// vraca glavnog doktora iz baze i uspisuje u labelu
  const getMainDoctor = async () => {
    try {
      //iz pacijenta dovlacimo adresu njegovog doktora opste prakse
      const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

      await patientContract.methods.getMainDoctor().call();
      const fetchedMainDoctorAddress = await patientContract.methods
        .getMainDoctor()
        .call();
      console.log(fetchedMainDoctorAddress);

      /// izvlacimo objekat doktor na osovu adrese
      const medicalPersonFactory = new web3.eth.Contract(
        MedicalPersonFactoryABI.abi,
        MedicalPersonFactoryAddress
      );
      const fetchedMainDoctor = await medicalPersonFactory.methods
        .getMedicalPersonsAsObject(fetchedMainDoctorAddress)
        .call();

      console.log(fetchedMainDoctor);
      setMainDoctor(fetchedMainDoctor);
      setShowMainDoctorLabel(true); //Prikaži labelu nakon što se dobije glavni doktor
    } catch (error) {
      console.error("Error while loading general practitioner:", error);
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

  const sortedMedicalPersons = [...allMedicalPersonsWithACCESS].sort((a, b) => {
    if (sortCriteria === "roleName") {
      return sortDirection === "asc"
        ? a.roleName.localeCompare(b.roleName)
        : b.roleName.localeCompare(a.roleName);
    } else if (sortCriteria === "last_name") {
      return sortDirection === "asc"
        ? a.last_name.localeCompare(b.last_name)
        : b.last_name.localeCompare(a.last_name);
    } else if (sortCriteria === "first_name") {
      return sortDirection === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name);
    } else if (sortCriteria === "medicalPersonAddress") {
      return sortDirection === "asc"
        ? a.medicalPersonAddress.localeCompare(b.medicalPersonAddress)
        : b.medicalPersonAddress.localeCompare(a.medicalPersonAddress);
    }
    // If no sorting criteria is selected, return original order
    return 0;
  });

  /// vraca sve medical persons sa dozvolom za pristup rekordima u jednu tabelu
  const getAllMedicalPersonsWithAccess = async () => {
    try {
      //lista  adresa! svih medical persons sa dozvolama
      const patientContract = new web3.eth.Contract(PatientABI.abi, patient);
      const ListOfMedicalPersonsAdress = await patientContract.methods
        .getAllMedicalPersonsWithAccess()
        .call();

      // Sad na osnovu adrese medical persons iz medical contract factory izvlacimo za svaku adresu objekat medicalperson
      ///taj objekat smestamo u niz
      const nizMedicalPersons = await Promise.all(
        ListOfMedicalPersonsAdress.map(async (address) => {
          try {
            const medicalPersonFactoryContract = new web3.eth.Contract(
              MedicalPersonFactoryABI.abi,
              MedicalPersonFactoryAddress
            );
            const structMedicalRecord =
              await medicalPersonFactoryContract.methods
                .getMedicalPersonsAsObject(address)
                .call();
            return structMedicalRecord;
          } catch (error) {
            console.error("Error fetching medical person data:", error);
            return null; // Or handle the error as needed
          }
        })
      );

      console.log(nizMedicalPersons);
      setallMedicalPersonsWithACCESS(nizMedicalPersons);
    } catch (error) {
      console.error("Error while loading general practitioner:", error);
    }
  };

  //////// vraca sve doktore opste prakse u opadajuci meni
  const getPractitioners = async () => {
    try {
      const medicalPersonFactory = new web3.eth.Contract(
        MedicalPersonFactoryABI.abi,
        MedicalPersonFactoryAddress
      );
      const fetchedPractitioners = await medicalPersonFactory.methods
        .getAllMedicalPersonsAsArray()
        .call();
      console.log(fetchedPractitioners);

      // Filtrirajte doktore koji imaju ulogu  general practicioner
      const GeneralPractitioners = fetchedPractitioners.filter(
        (practitioner) => practitioner.roleName == "general practitioner"
      );
      setPractitioners(GeneralPractitioners);
    } catch (error) {
      console.error("Error while loading general practitioners:", error);
    }
  };

  //// da se promeni glavni doktor i sacuva u bazi
  const handleChangeMainDoctor = async () => {
    console.log(selectedPractitionerAdress);
    if (selectedPractitionerAdress == null) {
      alert("Choose practicioner");
      return;
    }

    try {
      const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

      const transactionParameters = {
        to: patient,
        from: patient_account, // must match user's active address
        data: patientContract.methods
          .setMainDoctor(selectedPractitionerAdress)
          .encodeABI({ from: patient_account }),
      }; // call to contract method

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);

      alert("Promenjen glavni doktor!");
      getMainDoctor();
    } catch (error) {
      console.error("Error during changing medical record", error);
    }
  };

  // da se u listu doda jos jedan doktor with access

  const AddMedicalPersonWithAccess = async () => {
    if (selectedMedicalPerson == null) {
      alert("Choose medical person who u want to give access to your record");
      return;
    }

    try {
      const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

      const transactionParameters = {
        to: patient,
        from: patient_account, // must match user's active address
        data: patientContract.methods
          .addMedicalPersonWithAccess(selectedMedicalPerson)
          .encodeABI({ from: patient_account }),
      }; // call to contract method

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);

      alert("Medical person added!");
    } catch (error) {
      console.error("Error during changing medical record", error);
    }
  };

  const ExcludeMedicalPersonWithAccess = async () => {
    if (excludedMedicalPerson == null) {
      alert(
        "Choose medical person who u want to exclude from the list with access"
      );
      return;
    }

    try {
      const patientContract = new web3.eth.Contract(PatientABI.abi, patient);

      const transactionParameters = {
        to: patient,
        from: patient_account, // must match user's active address
        data: patientContract.methods
          .throwMedicalPersonFromTheListWithAccess(excludedMedicalPerson)
          .encodeABI({ from: patient_account }),
      }; // call to contract method

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);

      alert("Medical person excluded!");
    } catch (error) {
      console.error("Error during changing medical record", error);
    }
  };

  //da se promeni vrednost adrese  izabranog lekara iz opadajuce liste
  const handleSelectChange = (event) => {
    setSelectedPractitionerAdress(event.target.value);
  };
  //da se promeni vrednost adrese  medical persona iz opadajuce liste
  const handleSelectChangeMedicalPerson = (event) => {
    setselectedMedicalPerson(event.target.value);
  };

  const handleSelectExcludeMedicalPerson = (event) => {
    setselectedExcludedMedicalPerson(event.target.value);
  };

  ///get all medical persons in list to choose which one youto whome you would like to add access

  const getMedicalPersons = async () => {
    try {
      const medicalPersonFactory = new web3.eth.Contract(
        MedicalPersonFactoryABI.abi,
        MedicalPersonFactoryAddress
      );
      const allMedicalPersons = await medicalPersonFactory.methods
        .getAllMedicalPersonsAsArray()
        .call();
      setAllMedicalPersons(allMedicalPersons);
    } catch (error) {
      console.error("Error while loading general practitioners:", error);
    }
  };

  useEffect(() => {
    getMainDoctor();
    getPractitioners();
    getMedicalPersons();
    getAllMedicalPersonsWithAccess();
  }, []);

  return (
    <div className="doctor-panel">
      {setShowMainDoctorLabel && (
        <p className="main-doc">
          Main Doctor: {mainDoctor.last_name}/{mainDoctor.first_name} /
          {mainDoctor.medicalPersonAddress}/
        </p>
      )}
      <p>Select General practitioner:</p>
      <div className="select-btn-wrapper">
        <select
          className="select-field"
          medicalPersonAddress={selectedPractitionerAdress}
          onChange={handleSelectChange}
        >
          {practitioners.map((doctor, index) => (
            <option key={index} value={doctor.medicalPersonAddress}>
              {" "}
              {doctor.last_name}/{doctor.first_name} /
              {doctor.medicalPersonAddress}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleChangeMainDoctor}>
          Save main doctor
        </button>
      </div>
      <p>Choose medical person to share data:</p>
      <div className="select-btn-wrapper">
        <select
          className="select-field"
          medicalPersonAddress={selectedMedicalPerson}
          onChange={handleSelectChangeMedicalPerson}
        >
          {allMedicalPersons.map((medicalPerson, index) => (
            <option key={index} value={medicalPerson.medicalPersonAddress}>
              {medicalPerson.roleName} {medicalPerson.last_name}/
              {medicalPerson.first_name} /{medicalPerson.medicalPersonAddress}
            </option>
          ))}
        </select>
        <button className="button" onClick={AddMedicalPersonWithAccess}>
          Share data
        </button>
      </div>

      <p>Choose medical person to exclude:</p>
      <div className="select-btn-wrapper">
        <select
          className="select-field"
          medicalPersonAddress={excludedMedicalPerson}
          onChange={handleSelectExcludeMedicalPerson}
        >
          {allMedicalPersonsWithACCESS.map((medicalPerson, index) => (
            <option key={index} value={medicalPerson.medicalPersonAddress}>
              {medicalPerson.roleName} {medicalPerson.last_name}/
              {medicalPerson.first_name} /{medicalPerson.medicalPersonAddress}
            </option>
          ))}
        </select>
        <button className="button" onClick={ExcludeMedicalPersonWithAccess}>
          Exclude
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("roleName")}>
              Role name{" "}
              {sortCriteria === "roleName" && sortDirection === "asc" && "↑"}
              {sortCriteria === "roleName" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("last_name")}>
              Last name{" "}
              {sortCriteria === "last_name" && sortDirection === "asc" && "↑"}
              {sortCriteria === "last_name" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("first_name")}>
              First name{" "}
              {sortCriteria === "first_name" && sortDirection === "asc" && "↑"}
              {sortCriteria === "first_name" && sortDirection === "desc" && "↓"}
            </th>
            <th onClick={() => sortBy("medicalPersonAddress")}>
              Adress{" "}
              {sortCriteria === "medicalPersonAddress" &&
                sortDirection === "asc" &&
                "↑"}
              {sortCriteria === "medicalPersonAddress" &&
                sortDirection === "desc" &&
                "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMedicalPersons.map((oneMedicalPersonWithAcces, index) => (
            <tr key={index}>
              <td>{oneMedicalPersonWithAcces.roleName}</td>
              <td>{oneMedicalPersonWithAcces.last_name}</td>
              <td>{oneMedicalPersonWithAcces.first_name}</td>
              <td>{oneMedicalPersonWithAcces.medicalPersonAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicePanelDoctor;
