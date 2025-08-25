import React from 'react';

const StatCards = () => {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <h1> 🎯 </h1>
          <span className="stat-label">Days of LeetCode</span>
          <span className="stat-number">11</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <h1> 💻 </h1>
          <span className="stat-label">Problems Solved</span>
          <span className="stat-number" style={{ color: '#10b981' }}>30</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <h1> 📅 </h1>
          <span className="stat-label">Weeks Completed</span>
          <span className="stat-number" style={{ color: '#f59e0b' }}>3</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #7c3aed' }}>
          <h1> ⚛️ </h1>
          <span className="stat-label">Projects Completed</span>
          <span className="stat-number" style={{ color: '#7c3aed' }}>3</span>
        </div>
      </div>
      <br></br>
    </>
  );
};

export default StatCards;
