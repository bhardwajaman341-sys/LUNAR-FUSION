import { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [pipelineData, setPipelineData] = useState(null);

  const updatePipelineData = (data) => {
    setPipelineData(data);
  };

  return (
    <RegistrationContext.Provider value={{ pipelineData, updatePipelineData }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  return useContext(RegistrationContext);
}