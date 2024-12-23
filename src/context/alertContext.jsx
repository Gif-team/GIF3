import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alertPopUp, setAlertPopUp] = useState(false);

  return (
    <AlertContext.Provider value={{ alertPopUp, setAlertPopUp }}>
      {children}
    </AlertContext.Provider>
  );
}
