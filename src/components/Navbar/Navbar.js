import "./Navbar.css";
import logo from "../assets/logo1.png";

function Navbar(props) {
  return (
    <div className="navbar">
      <img src={logo} className="logo" />
      <ul>
        <li>Logged as:{props.account}</li>
      </ul>
    </div>
  );
}

export default Navbar;
