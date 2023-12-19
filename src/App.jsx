// App.jsx

import React, { useState } from "react";
import Form from "./components/Form";
import PaymentSection from "./components/PaymentSection";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [formData, setFormData] = useState({
    // your initial form data here
  });

  const handleFormSubmit = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Form onFormSubmit={handleFormSubmit} />
      <PaymentSection formData={formData} />
    </div>
  );
};

export default App;
