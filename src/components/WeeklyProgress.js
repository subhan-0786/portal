import React from 'react';
import { learningDays } from '../data/learningdaysData';

const WeeklyProgress = ({ isActive }) => {

  return (
    <section className={`content-section ${isActive ? 'active' : ''}`}>
      <h2 style={{marginBottom: '25px', color: '#4a5568'}}>Weekly Learning Progress</h2>
      
      {learningDays.map((day, index) => (
        <div key={index} className="learning-card">
          <div className="video-count">{day.day}</div>
          <h3 style={{color: '#744210', marginBottom: '10px'}}>{day.date}</h3>
          <div className="topics-grid">
            {day.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="topic-item">{topic}</div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default WeeklyProgress;