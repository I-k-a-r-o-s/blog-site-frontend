import { createContext, useContext } from "react";

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const appValues = {};
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
