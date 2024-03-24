import "./ServicesList.css";
import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import Diagnosis from "../../components/assets/servicesIcons/diagnosis.png";
import Vaccine from "../../components/assets/servicesIcons/vaccine.png";
import Medicine from "../../components/assets/servicesIcons/medicine.png";
import Laboratory from "../../components/assets/servicesIcons/blood-test.png";
import Appointment from "../../components/assets/servicesIcons/appointment.png";
import Insurance from "../../components/assets/servicesIcons/health-insurance.png";
import RecordFactoryABI from "../../contracts/RecordFactory.json";
import ServicePanelAppointments from "../ServicePanel/ServicePanelAppointments";
import ServicePanelHealthInsurance from "../ServicePanel/ServicePanelHealthInsurance";
import ServicePanelImunnisation from "../ServicePanel/ServicePanelImunnisation";
import ServicePanelLaboratory from "../ServicePanel/ServicePanelLaboratory";
import ServicePanelMedicalRecord from "../ServicePanel/ServicePanelMedicalRecord";
import ServicePanelMedicine from "../ServicePanel/ServicePanelMedicine";

function ServicesList(props) {
  const [showPanelAppointments, setshowPanelAppointments] = useState(false);
  const [showPanelMedicalRecord, setshowPanelMedicalRecord] = useState(false);
  const [showPanelImunnisation, setshowPanelImunnisation] = useState(false);
  const [showPanelMedicine, setshowPanelMedicine] = useState(false);
  const [showPanelLaboratory, setshowPanelLaboratory] = useState(false);
  const [showPanelHealthInsurance, setshowPanelHealthInsurance] =
    useState(false);

  const handleServiceClick = (id) => {
    if (id == 1) {
      setshowPanelMedicalRecord(true);
    }
    if (id == 2) {
      setshowPanelImunnisation(true);
    }
    if (id == 3) {
      setshowPanelMedicine(true);
    }
    if (id == 4) {
      setshowPanelLaboratory(true);
    }
    if (id == 5) {
      setshowPanelAppointments(true);
    }
    if (id == 6) {
      setshowPanelHealthInsurance(true);
    }
  };

  return (
    <div className="services-list">
      <div className="services-list1" onClick={() => handleServiceClick(1)}>
        <Service Icon={Diagnosis} Desc={"Medical Records"}></Service>
      </div>
      <div className="services-list2" onClick={() => handleServiceClick(2)}>
        <Service Icon={Vaccine} Desc={"Vaccine"}></Service>
      </div>
      <div className="services-list3" onClick={() => handleServiceClick(3)}>
        <Service Icon={Medicine} Desc={"Medicine"}></Service>
      </div>
      <div className="services-list4" onClick={() => handleServiceClick(4)}>
        <Service Icon={Laboratory} Desc={"Laboratory"}></Service>
      </div>
      <div className="services-list5" onClick={() => handleServiceClick(5)}>
        <Service Icon={Appointment} Desc={"Appointments"}></Service>
      </div>
      <div className="services-list6" onClick={() => handleServiceClick(6)}>
        <Service Icon={Insurance} Desc={"Health insurance"}></Service>
      </div>

      {showPanelMedicalRecord && (
        <ServicePanelMedicalRecord
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          MedicalRecordFactoryAddress={props.MedicalRecordFactoryAddress}
          onClose={() => setshowPanelMedicalRecord(false)}
        />
      )}
      {showPanelImunnisation && (
        <ServicePanelImunnisation
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelImunnisation(false)}
        />
      )}
      {showPanelMedicine && (
        <ServicePanelMedicine
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelMedicine(false)}
        />
      )}
      {showPanelLaboratory && (
        <ServicePanelLaboratory
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelLaboratory(false)}
        />
      )}
      {showPanelAppointments && (
        <ServicePanelAppointments
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelAppointments(false)}
        />
      )}
      {showPanelHealthInsurance && (
        <ServicePanelHealthInsurance
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelHealthInsurance(false)}
        />
      )}
    </div>
  );
}

export default ServicesList;
