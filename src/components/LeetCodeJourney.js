import React from 'react';
import { leetcodeData } from '../data/leetcodeData.js';


const LeetCodeJourney = ({ isActive }) => {
  const ProblemLink = ({ problem }) => (
    <li>
      <a 
        href={`https://github.com/subhan-0786/JS-LeetCode/blob/main/${problem.file}`}
        target="_blank" 
        rel="noopener noreferrer"
        style={{color: 'inherit', textDecoration: 'none'}}
      >
        {problem.name}
      </a>
    </li>
  );

  return (
    <section className={`content-section ${isActive ? 'active' : ''}`}>
      <h2 style={{marginBottom: '25px', color: '#4a5568'}}>LeetCode Problem Solving Journey</h2>
      
      <div className="day-grid">
        {leetcodeData.map((day, index) => (
          <div key={index} className="day-card">
            <div className="day-title">{day.date}</div>
            <ul className="problems-list">
              {day.problems.map((problem, problemIndex) => (
                <ProblemLink key={problemIndex} problem={problem} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeetCodeJourney;