
import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext();


// eslint-disable-next-line react/prop-types
export const TicketProvider = ({ children }) => {
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  return (
    <TicketContext.Provider value={{ grouping, setGrouping, ordering, setOrdering }}>
      {children}
    </TicketContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useTicketContext = () => {
  return useContext(TicketContext);
};
