import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <>
      <button 
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className={`toggle-icon ${isDarkMode ? 'dark' : 'light'}`}>
          {isDarkMode ? '🌙' : '☀️'}
        </div>
      </button>
    </>
  );
};

export default DarkModeToggle;