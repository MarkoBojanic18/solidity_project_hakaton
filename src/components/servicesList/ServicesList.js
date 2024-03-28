import "./ServicesList.css";
import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import Diagnosis from "../../components/assets/servicesIcons/diagnosis.png";
import Vaccine from "../../components/assets/servicesIcons/vaccine.png";
import Medicine from "../../components/assets/servicesIcons/medicine.png";
import Laboratory from "../../components/assets/servicesIcons/blood-test.png";
import Appointment from "../../components/assets/servicesIcons/appointment.png";
import Insurance from "../../components/assets/servicesIcons/health-insurance.png";
import Doctor from "../../components/assets/servicesIcons/doctor.png";
import HeartRate from "../../components/assets/servicesIcons/heart.png";
import BloodPressure from "../../components/assets/servicesIcons/blood-pressure.png";

import RecordFactoryABI from "../../contracts/RecordFactory.json";
import ServicePanelAppointments from "../ServicePanel/ServicePanelAppointments";
import ServicePanelHealthInsurance from "../ServicePanel/ServicePanelHealthInsurance";
import ServicePanelImunnisation from "../ServicePanel/ServicePanelImunnisation";
import ServicePanelLaboratory from "../ServicePanel/ServicePanelLaboratory";
import ServicePanelMedicalRecord from "../ServicePanel/ServicePanelMedicalRecord";
import ServicePanelMedicine from "../ServicePanel/ServicePanelMedicine";
import ServicePanelHeartRate from "../ServicePanel/ServicePanelHeartRate";
import ServicePanelMeasurePressure from "../ServicePanel/ServicePanelMeasurePressure";
import ServicePanelDoctor from "../ServicePanel/ServicePanelDoctor";

function ServicesList(props) {
  const [showPanelAppointments, setshowPanelAppointments] = useState(false);
  const [showPanelMedicalRecord, setshowPanelMedicalRecord] = useState(true);
  const [showPanelImunnisation, setshowPanelImunnisation] = useState(false);
  const [showPanelMedicine, setshowPanelMedicine] = useState(false);
  const [showPanelLaboratory, setshowPanelLaboratory] = useState(false);
  const [showPanelHealthInsurance, setshowPanelHealthInsurance] =
    useState(false);
  const [showPanelHeartRate, setshowPanelHeartRate] = useState(false);
  const [showPanelMeasurePressure, setshowPanelMeasurePressure] =
    useState(false);
    const [showPanelDoctors, setshowPanelDoctors] =
    useState(false);

  const handleServiceClick = (id) => {
    if (id == 1) {
      setshowPanelMedicalRecord(true);
    } else setshowPanelMedicalRecord(false);
    if (id == 2) {
      setshowPanelImunnisation(true);
    } else setshowPanelImunnisation(false);
    if (id == 3) {
      setshowPanelMedicine(true);
    } else setshowPanelMedicine(false);
    if (id == 4) {
      setshowPanelLaboratory(true);
    } else setshowPanelLaboratory(false);
    if (id == 5) {
      setshowPanelAppointments(true);
    } else setshowPanelAppointments(false);
    if (id == 6) {
      setshowPanelHealthInsurance(true);
    } else setshowPanelHealthInsurance(false);
    if (id == 7) {
      setshowPanelHeartRate(true);
    } else setshowPanelHeartRate(false);
    if (id == 8) {
      setshowPanelMeasurePressure(true);
    } else setshowPanelMeasurePressure(false);
    if (id == 9) {
      setshowPanelDoctors(true);
    } else setshowPanelDoctors(false);
  };

  return (
    <div className="services-list-panel-wrapper">
    <div className="services-list">
       <div className="services-list9" onClick={() => handleServiceClick(9)}>
        <Service Icon={Doctor} Desc={"Doctors"}></Service>
      </div>
      <div className="services-list7" onClick={() => handleServiceClick(7)}>
        <Service Icon={HeartRate} Desc={"Check heart rate"}></Service>
      </div>
      <div className="services-list8" onClick={() => handleServiceClick(8)}>
        <Service Icon={BloodPressure} Desc={"Check blood pressure"}></Service>
      </div>
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
    </div>
      
      <div className="services-open-wrapper">
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
          // RecordFactoryAddress={props.RecordFactoryAddress}
          // patient_account={props.patient_account}
          // web3={props.web3}
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
      {showPanelHeartRate && (
        <ServicePanelHeartRate
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelHeartRate(false)}
        />
      )}
      {showPanelMeasurePressure && (
        <ServicePanelMeasurePressure
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelMeasurePressure(false)}
        />
      )}
        {showPanelDoctors && (
        <ServicePanelDoctor
          RecordFactoryAddress={props.RecordFactoryAddress}
          patient_account={props.patient_account}
          web3={props.web3}
          onClose={() => setshowPanelDoctors(false)}
        />
      )}
      </div>
      </div>
  );
}

export default ServicesList;
