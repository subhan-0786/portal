import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from memory on mount
  useEffect(() => {
    const savedTheme = window.darkModeState || 'light';
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Apply theme to document and save to memory
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      window.darkModeState = 'dark';
    } else {
      document.documentElement.classList.remove('dark-mode');
      window.darkModeState = 'light';
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleDarkMode
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};