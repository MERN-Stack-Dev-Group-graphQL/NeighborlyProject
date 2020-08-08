import React from 'react';

const AlertContext = React.createContext({});

export const AlertConsumer = AlertContext.Consumer;

export const AlertProvider = ({children}) => {
  const alert = () => alert('alert');

  return (
    <AlertContext.Provider value={{alert}}>{children}</AlertContext.Provider>
  );
};
