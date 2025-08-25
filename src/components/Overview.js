import React from 'react';

const Overview = ({ isActive }) => {
  return (
    <section className={`content-section ${isActive ? 'active' : ''}`}>
      <h2 style={{marginBottom: '25px', color: '#4a5568'}}>Internship Overview</h2>
      
      <div className="week-card">
        <div className="week-title">Week 1: JavaScript Fundamentals</div>
        <div className="week-period">July 28 - August 1, 2025</div>
        <div className="achievements">
          <div className="achievement-item">
            ✅ Completed JavaScript fundamentals from "JS Learn Everything" playlist
          </div>
          <div className="achievement-item">
            📝 Weekend Assignment: Object and Array Destructuring (PDF submitted)
          </div>
        </div>
      </div>

      <div className="week-card">
        <div className="week-title">Week 2: Advanced JavaScript</div>
        <div className="week-period">August 4 - August 8, 2025</div>
        <div className="achievements">
          <div className="achievement-item">
            🎯 Completed Namaste JavaScript Season 1 & 2 (5 days)
          </div>
          <div className="achievement-item">
            📚 Submitted handwritten notes PDF
          </div>
          <div className="achievement-item">
            🏗️ Weekend Project: BuildCorp Dashboard (HTML, CSS, JS)
          </div>
        </div>
      </div>

      <div className="week-card">
        <div className="week-title">Week 3: React Learning Journey</div>
        <div className="week-period">August 11 - August 15, 2025</div>
        <div className="achievements">
          <div className="achievement-item">
            ⚛️ Started "Chai aur React" playlist
          </div>
          <div className="achievement-item">
            🎬 Watched 29 videos covering React fundamentals to deployment
          </div>
          <div className="achievement-item">
            🛠️ Built multiple projects including bgChanger, currency converter, and more
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;