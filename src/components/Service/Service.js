import "./Service.css";
import Diagnosis from "../../components/assets/servicesIcons/diagnosis.png";

function ServicesList(props) {
 

  return (
    <div className="service">
      <img className="service-icon" src={props.Icon}></img>
      <span>{props.Desc}</span>
    </div>
  );
}

export default ServicesList;
