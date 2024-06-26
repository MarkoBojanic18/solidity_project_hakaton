import React, { useState } from "react";
import "./NavbarHomePage.css";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import manPicture from "../../components/assets/man.png";
import femalePicture from "../../components/assets/female.png";
import UserModal from "../UserModal/UserModal";

function NavbarHomePage({
  patient_account,
  first_name,
  last_name,
  password,
  gender,
  year_of_birth,
  unique_in,
  bloodType,
  height,
  weight,
  donor,
  loadPatientData,
  web3,
}) {
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
      <img src={logo} className="logo" onClick={loadPatientData} />
      <ul className="navbarHomePageList">
        <li>
          Logged as:
          {patient_account
            ? patient_account
            : "0xA8c9D6d03E3a29C843DD27442d0aE7651B8D89C5"}
        </li>

        <Link to={"/"} className="logout-button">
          <p>Logout</p>
        </Link>
        <img
          className="avatar"
          src={gender === "female" ? femalePicture : manPicture}
          alt=""
          onClick={openModal}
        />
      </ul>

      {/* Prikaz modala ako je modalIsOpen postavljen na true */}
      {modalIsOpen && (
        <UserModal
          closeModal={closeModal}
          first_name={first_name}
          last_name={last_name}
          password={password}
          gender={gender}
          year_of_birth={year_of_birth}
          unique_in={unique_in}
          bloodType={bloodType}
          height={height}
          weight={weight}
          donor={donor}
          patient_account={patient_account}
          web3={web3}
        />
      )}
    </div>
  );
}

export default NavbarHomePage;
