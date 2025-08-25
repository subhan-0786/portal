import React from 'react';
import { projects } from '../data/projectsData.js';

const Projects = ({ isActive }) => {

  const handleProjectClick = (project) => {
    if (project.link) {
      if (project.linkType === "demo" && project.link.startsWith("./")) {
        window.open(project.link, '_blank');
      } else {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getIcon = (linkType) => {
    switch (linkType) {
      case "demo":
        return "🚀";
      case "pdf":
        return "📄";
      case "github":
        return "⚡";
      default:
        return "🔗";
    }
  };

  return (
    <section className={`content-section ${isActive ? 'active' : ''}`}>
      <h2 style={{marginBottom: '25px', color: 'var(--text-tertiary)'}}>Projects & Assignments</h2>
      
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={`project-card ${project.link ? 'clickable-project' : ''}`}
          onClick={() => handleProjectClick(project)}
          style={{
            cursor: project.link ? 'pointer' : 'default',
            position: 'relative'
          }}
        >
          <div className="project-header">
            <div className="project-title">{project.title}</div>
            {project.link && (
              <div className="project-link-indicator">
                <span className="link-icon">{getIcon(project.linkType)}</span>
                <span className="link-text">{project.linkText}</span>
              </div>
            )}
          </div>
          <p>{project.description}</p>
          <div className="tech-tags">
            {project.techStack.map((tech, techIndex) => (
              <span key={techIndex} className="tech-tag">{tech}</span>
            ))}
          </div>
          {project.link && (
            <div className="click-hint">
              Click to {project.linkText.toLowerCase()} →
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Projects;