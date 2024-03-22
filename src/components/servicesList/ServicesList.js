import "./ServicesList.css";
import Service from "../Service/Service"
import Diagnosis from "../../components/assets/servicesIcons/diagnosis.png";
import Vaccine from "../../components/assets/servicesIcons/vaccine.png";
import Medicine from "../../components/assets/servicesIcons/medicine.png";
import Laboratory from "../../components/assets/servicesIcons/blood-test.png";
import Appointment from "../../components/assets/servicesIcons/appointment.png";
import Insurance from "../../components/assets/servicesIcons/health-insurance.png";

function ServicesList() {
 

  return (
    <div className="services-list">
      <Service
      Icon={Diagnosis}
      Desc={"Medical Records"}
      ></Service>
      <Service
      Icon={Vaccine}
      Desc={"Vaccine"}
      ></Service>
      <Service
      Icon={Medicine}
      Desc={"Medicine"}
      ></Service>
      <Service
      Icon={Laboratory}
      Desc={"Laboratory"}
      ></Service>
      <Service
      Icon={Appointment}
      Desc={"Appointments"}>
      </Service>
      <Service
      Icon={Insurance}
      Desc={"Health insurance"}
      ></Service>
    </div>
  );
}

export default ServicesList;
