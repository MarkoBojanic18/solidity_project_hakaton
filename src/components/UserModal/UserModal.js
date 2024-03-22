import React, { useState } from "react";
import "./UserModal.css";

function UserModal(props) {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    // setIsOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="user-modal-wrapper">
          <div className="user-modal-overlay">
            <div className="user-modal">
              <div className="user-informations">
                <div className="single-info">
                  <span className="info-desc">Name:</span>
                  <span className="info-value">Nikola</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Surname:</span>
                  <span className="info-value">Jovanovic</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">JMBG:</span>
                  <span className="info-value">2204999778312</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Gender:</span>
                  <span className="info-value">Male</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Date of birth:</span>
                  <span className="info-value">19.02.1999</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Blood type:</span>
                  <span className="info-value">A+</span>
                </div>
                <div className="single-info">
                  <span className="info-desc">Height:</span>
                  <span className="info-value">185cm</span>
                </div>
                <form className="update-height-frm">
                  <div className="inputbox">
                    <input required="required" type="text" />
                    <span>Update height</span>
                    <i></i>
                  </div>

                  <button type="submit" className="update-btn">
                    Update
                  </button>
                </form>

                <div className="single-info">
                  <span className="info-desc">Weight:</span>
                  <span className="info-value">90kg</span>
                </div>

                <form className="update-height-frm">
                  <div class="inputbox">
                    <input required="required" type="text" />
                    <span>Update weight</span>
                    <i></i>
                  </div>
                  <button type="submit" className="update-btn">
                    Update
                  </button>
                </form>

                <div className="single-info">
                  <span className="info-desc">Organ donator:</span>
                  <span className="info-value">Yes</span>
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
