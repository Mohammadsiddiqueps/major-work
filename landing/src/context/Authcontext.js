// Import necessary React modules
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const MainUsernameContext = createContext();

// Create a context provider
export const MainUsernameProvider = ({ children }) => {
  const [mainUsername, setMainUsername] = useState();

  useEffect(() => {
    // Check local storage for user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        // Parse and set user data to state
        const parsedUserData = JSON.parse(storedUserData);
        setMainUsername(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
  }, []); // Run this effect only once on component mount

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
