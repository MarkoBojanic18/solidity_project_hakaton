import React, { useState } from "react";
import "./NavbarHomePage.css";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import manPicture from "../../components/assets/man.png";
import femalePicture from "../../components/assets/female.png";
import UserModal from "../UserModal/UserModal";

function NavbarHomePage(props) {

  // Stanje koje će označiti da li je modal otvoren
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Funkcija koja će otvoriti modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  // Funkcija koja će zatvoriti modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="navbarHomePage">
      <img src={logo} className="logo" />
      <ul className="navbarHomePageList">
        <li>Logged as:{props.patient_account}</li>
      
        <Link to={"/"} className="logout-button">
          <p>Logout</p>
        </Link>
        <img
          className="avatar"
          src={props.gender === "male" ? manPicture : femalePicture}
          alt=""
          onClick={openModal}
        />
      </ul>

      {/* Prikaz modala ako je modalIsOpen postavljen na true */}
      {modalIsOpen && (
        <UserModal
          closeModal={closeModal}
          first_name={props.first_name}
          last_name={props.last_name}
          password={props.password}
          gender={props.gender}
          year_of_birth={props.year_of_birth}
          unique_in={props.unique_in}
        />
      )}
    </div>
  );
}

export default NavbarHomePage;
