import React, { useState } from 'react';
import "./UserModal.css";


function UserModal(props) {

    const [isOpen, setIsOpen] = useState(true);

    const onClose = () => {
        setIsOpen(false);
        props.closeModal();
    };

  return (
    <>
    if{isOpen && (
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
        <span className="info-value">A+</span>
        </div>
        <div className="single-info">
        <span className="info-desc">Height:</span>
        <span className="info-value">185cm</span>
        </div>
        <form className="update-height-frm">
        <div className="inputbox">
            <input required="required" type="text"/>
            <span>Update height</span>
            <i></i>
        </div>
        
        <button type="submit" className="update-btn">Update</button>
        </form>

        <div className="single-info">
        <span className="info-desc">Weight:</span>
        <span className="info-value">90kg</span>
        </div>

        <form className="update-height-frm">
        <div class="inputbox">
            <input required="required" type="text"/>
            <span>Update weight</span>
            <i></i>
        </div>
        <button type="submit" className="update-btn">Update</button>
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

