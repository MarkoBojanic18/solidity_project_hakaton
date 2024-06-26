import React, { useState } from "react";
import "./UserModal.css";
import PatientABI from "../../contracts/Patient.json";

function UserModal(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState({
    height: props.height,
    weight: props.weight,
  });

  const patient = sessionStorage.getItem("patient");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.value);
  };

  const handleSubmit = async (id) => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.log("MetaMask is not installed or not connected!");
      return;
    }
    if (!props.web3 || !props.patient_account) {
      alert("Web3 instance or account is not available.");
      return;
    }
    try {
      const patientContract = new props.web3.eth.Contract(
        PatientABI.abi,
        patient
      );

      var transactionParameters = "";

      if (id == 1) {
        console.log("HEIGHT");
        transactionParameters = {
          to: patient,
          from: props.patient_account, // must match user's active address
          data: patientContract.methods
            .setHeight(userData.height)
            .encodeABI({ from: props.patient_account }),
        }; // call to contract method
      } else {
        transactionParameters = {
          to: patient,
          from: props.patient_account, // must match user's active address
          data: patientContract.methods
            .setWeight(userData.weight)
            .encodeABI({ from: props.patient_account }),
        }; // ca
      }

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Error during changing height/weight of patient!", error);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    props.closeModal();
  };

  return (
    <>
      if
      {isOpen && (
        <div className="user-modal-wrapper">
          <div className="user-modal-overlay">
            <div className="user-modal">
              <div className="user-informations">
                <div className="single-info">
                  <span className="info-desc">Name:</span>
                  <span className="info-value">{props.first_name}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Surname:</span>
                  <span className="info-value">{props.last_name}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">JMBG:</span>
                  <span className="info-value">{props.unique_in}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Gender:</span>
                  <span className="info-value">{props.gender}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Date of birth:</span>
                  <span className="info-value">{props.year_of_birth}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Blood type:</span>
                  <span className="info-value">{props.bloodType}</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Height:</span>
                  <span className="info-value">{props.height}</span>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="update-height-frm"
                >
                  <div className="inputbox">
                    <input
                      required="required"
                      name="height"
                      type="text"
                      onChange={handleChange}
                    />
                    <span>Update height</span>
                    <i></i>
                  </div>

                  <button
                    className="update-btn"
                    onClick={() => handleSubmit(1)}
                  >
                    Update
                  </button>
                </form>

                <div className="single-info">
                  <span className="info-desc">Weight:</span>
                  <span className="info-value">{props.weight}</span>
                </div>

                <form className="update-height-frm">
                  <div class="inputbox">
                    <input required="required" name="weight" type="text" />
                    <span>Update weight</span>
                    <i></i>
                  </div>
                  <button
                    className="update-btn"
                    onClick={() => handleSubmit(2)}
                  >
                    Update
                  </button>
                </form>

                <div className="single-info">
                  <span className="info-desc">Organ donator:</span>
                  <span className="info-value">{props.donor}</span>
                </div>
              </div>
              <div className="close-button" onClick={onClose}>
                <div className="close-container">
                  <div className="leftright"></div>
                  <div className="rightleft"></div>
                  <label className="close">close</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserModal;
