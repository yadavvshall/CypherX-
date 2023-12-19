// src/App.js
import React from "react";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar /> 
      <div className="content">
        <Navbar />
        <Form />
      </div>
    </div>
  );
}

export default App;
