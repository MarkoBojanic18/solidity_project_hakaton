import "./App.css";
import Main from "../src/components/main/Main.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/login/Login.js";
import React, { useState, useEffect } from "react";
import HomePage from "./components/homePage/HomePage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/homePage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
