// src/App.jsx
import React from "react";
import NavBar from "./components/Navbar";
import TicketCards from "./components/TicketCards";
import { TicketProvider } from "./context/TicketContex";

function App() {
  const handleGroupingChange = (event) => {
   
    console.log("Grouping changed to:", event.target.value);
  };

  const handleOrderingChange = (event) => {
    
    console.log("Ordering changed to:", event.target.value);
  };

  const handleThemeSwitch = () => {
    
    document.documentElement.classList.toggle("dark-theme");
    document.body.classList.toggle("dark-theme");
    console.log("Theme switched");
  };

  return (
    <TicketProvider>
      <NavBar
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
        onThemeSwitch={handleThemeSwitch}
      />
      <div className=" min-h-screen p-4">
        <TicketCards />
      </div>
    </TicketProvider>
  );
}

export default App;
