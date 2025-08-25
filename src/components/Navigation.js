import React from 'react';

const Navigation = ({ activeSection, showSection }) => {
  return (
    <nav className="nav-buttons">
      <button 
        className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
        onClick={() => showSection('overview')}
      >
        Overview
      </button>
      <button 
        className={`nav-btn ${activeSection === 'leetcode' ? 'active' : ''}`}
        onClick={() => showSection('leetcode')}
      >
        LeetCode Journey
      </button>
      <button 
        className={`nav-btn ${activeSection === 'weekly' ? 'active' : ''}`}
        onClick={() => showSection('weekly')}
      >
        React Journey
      </button>
      <button 
        className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`}
        onClick={() => showSection('projects')}
      >
        Projects
      </button>
    </nav>
  );
};

export default Navigation;