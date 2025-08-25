import React, { useEffect, useState } from 'react';

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const header = document.querySelector('.header');
    if (header) {
      header.addEventListener('mousemove', handleMouseMove);
      return () => header.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <header 
      className={`header ${isLoaded ? 'loaded' : ''}`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {/* Floating icons */}
      <div className="floating-icons">
        <div className="icon-container" style={{animationDelay: '0s'}}>⚛️</div>
        <div className="icon-container" style={{animationDelay: '1s'}}>💻</div>
        <div className="icon-container" style={{animationDelay: '2s'}}>🚀</div>
        <div className="icon-container" style={{animationDelay: '0.5s'}}>🎯</div>
        <div className="icon-container" style={{animationDelay: '1.5s'}}>⭐</div>
        <div className="icon-container" style={{animationDelay: '2.5s'}}>🔥</div>
      </div>
      
      {/* Interactive glow effect that follows mouse */}
      <div 
        className="mouse-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>
      
      <h1>
        <span className="text-gradient">AI NAECO BLUE</span>
        <br />
        <span className="text-secondary">Internship Progress</span>
      </h1>
      
      <p className="subtitle">
        React • JavaScript • LeetCode
      </p>
      
      {/* Progress rings */}
      <div className="progress-rings">
        <div className="ring ring-1">
          <div className="ring-progress" style={{'--progress': '75%'}}></div>
          <span className="ring-label">JS</span>
        </div>
        <div className="ring ring-2">
          <div className="ring-progress" style={{'--progress': '90%'}}></div>
          <span className="ring-label">React</span>
        </div>
        <div className="ring ring-3">
          <div className="ring-progress" style={{'--progress': '85%'}}></div>
          <span className="ring-label">LeetCode</span>
        </div>
      </div>
    </header>
  );
};

export default Header;