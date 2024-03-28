import React, { useEffect, useState } from "react";
import "./ServicePanel.css";

function ServicePanelLaboratory() {
  const [button1IsClicked, setButton1IsClicked] = useState(false);
  const [button2IsClicked, setButton2IsClicked] = useState(false);
  const [button3IsClicked, setButton3IsClicked] = useState(false);

  const handleDetailsClick = (id) => {
    if (id == 1) {
      setButton1IsClicked(true);
    } else setButton1IsClicked(false);
    if (id == 2) {
      setButton2IsClicked(true);
    } else setButton2IsClicked(false);
    if (id == 3) {
      setButton3IsClicked(true);
    } else setButton3IsClicked(false);
  };

  return (
    <div className="laboratory-containter">
      <div className="lab-wrapper">
        <h1 className="client-list-title">Laboratory reports of patient</h1>

        {/* <div className="lab-header">
        <div className="lab-report-name">Laboratory Report</div>
        <div className="lab-report-date">Date</div>
        <div className=""></div>
    </div> */}

        <div className="all-lab-reports" onClick={() => handleDetailsClick(1)}>
          <div className="lab-report-name">General Report </div>
          <div className="lab-report-date">03/21/2022 7:08:32 PM </div>
          {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
        </div>
        <div className="all-lab-reports" onClick={() => handleDetailsClick(2)}>
          <div className="lab-report-name">General Report </div>
          <div className="lab-report-date">01/11/2023 14:08:32 PM </div>
          {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
        </div>
        <div className="all-lab-reports" onClick={() => handleDetailsClick(3)}>
          <div className="lab-report-name">General Report </div>
          <div className="lab-report-date">03/27/2024 17:08:32 PM </div>
          {/* <button className="change-buttton button2" onClick={handleDetailsClick}>Details</button> */}
        </div>
      </div>
      {button1IsClicked && (
        <div className="laboratory-panel">
          <div className="report-name">
            Pharmacist: 0x68060D767Fa07C34cF3fCb69d788873aBe49D491
          </div>
          <div className="report-name">Blood test - Result</div>

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

          <div className="report-name">General biochemistry</div>
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

      {button2IsClicked && (
        <div className="laboratory-panel">
          <div className="report-name">
            Pharmacist: 0x521D9eC458984ABBa44cFCdd764E693D0F4fB00d
          </div>
          <div className="report-name">Blood test - Result</div>

          <div className="report-content">
            <div className="single-content odd">
              <div className="content-name">Leucotics</div>
              <div className="content-value">8.30</div>
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

          <div className="report-name">General biochemistry</div>
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

      {button3IsClicked && (
        <div className="laboratory-panel">
          <div className="report-name">
            Pharmacist: 0x68060D767Fa07C34cF3fCb69d788873aBe49D491
          </div>
          <div className="report-name">Blood test - Result</div>

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

          <div className="report-name">General biochemistry</div>
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
