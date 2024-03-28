import React, { useEffect, useState } from "react";
import "./ServicePanel.css";


function ServicePanelLaboratory() {

    const [buttonIsClicked, setButtonIsClicked] = useState(false);

    const handleDetailsClick = () => {
          setButtonIsClicked(true);
    }

  return (

    <div className="laboratory-containter">
   <div className="lab-wrapper">
    <h1 className="client-list-title">Laboratory reports of patient</h1>

    {/* <div className="lab-header">
        <div className="lab-report-name">Laboratory Report</div>
        <div className="lab-report-date">Date</div>
        <div className=""></div>
    </div> */}
    
        <div className="all-lab-reports" onClick={handleDetailsClick} >
        <div className="lab-report-name">General Report </div>
        <div className="lab-report-date">03/27/2024 7:08:32 PM </div>
        {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
    </div>
    <div className="all-lab-reports" onClick={handleDetailsClick}>
        <div className="lab-report-name">General Report </div>
        <div className="lab-report-date">03/27/2024 7:08:32 PM </div>
        {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
    </div>
    <div className="all-lab-reports" onClick={handleDetailsClick}>
        <div className="lab-report-name">General Report </div>
        <div className="lab-report-date">03/27/2024 7:08:32 PM </div>
        {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
    </div>

   

    </div>
    {buttonIsClicked && (
    <div className="laboratory-panel">
        <div className="report-name">
            Blood test - Result
        </div>
        <div className="report-content">
            <div className="single-content odd">
                <div className="content-name">Leucotics</div>
                <div className="content-value">8.20</div>
                <div className="content-value">4.00 - 11.00</div>
                <div className="content-value"> 10^9/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">Eritrocits</div>
                <div className="content-value">5.33</div>
                <div className="content-value">4.50 - 6.50</div>
                <div className="content-value"> 10^12/L</div>
            </div>
            <div className="single-content odd">
                <div className="content-name">Hemoglobin</div>
                <div className="content-value">162</div>
                <div className="content-value">130 - 180</div>
                <div className="content-value"> g/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">MCV</div>
                <div className="content-value">89.0</div>
                <div className="content-value">76.0 - 96.0</div>
                <div className="content-value"> 10^9/L</div>
            </div>
            <div className="single-content odd">
                <div className="content-name">MCH</div>
                <div className="content-value">30.24</div>
                <div className="content-value">27.0 - 32.0</div>
                <div className="content-value"> L/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">Platelets</div>
                <div className="content-value">203</div>
                <div className="content-value">160 - 370</div>
                <div className="content-value"> 10^9/L</div>
            </div>
        </div>
       
        <div className="report-name">
            General biochemistry
        </div>
        <div className="report-content">
            <div className="single-content odd">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
            <div className="single-content odd">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
            <div className="single-content odd">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
            <div className="single-content">
                <div className="content-name">Glucose</div>
                <div className="content-value">4.9</div>
                <div className="content-value">4.1 - 5.9</div>
                <div className="content-value"> mmmol/L</div>
            </div>
        </div>

    </div>
)}
    </div>
  );
}

export default ServicePanelLaboratory;