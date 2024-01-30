// Import necessary React modules
import { createContext, useContext, useState } from 'react';

// Create a context
const MainUsernameContext = createContext();

// Create a context provider
export const MainUsernameProvider = ({ children }) => {
  const [mainUsername, setMainUsername] = useState();

  return (
    <MainUsernameContext.Provider value={{ mainUsername, setMainUsername }}>
      {children}
    </MainUsernameContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMainUsername = () => {
  const context = useContext(MainUsernameContext);
  if (!context) {
    throw new Error('useMainUsername must be used within a MainUsernameProvider');
  }
  return context;
};
