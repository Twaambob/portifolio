import React from 'react';

const defaultProjects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Neural Network background animations",
    link: "#",
    technologies: ["React", "JavaScript", "CSS3"]
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management",
    link: "#",
    technologies: ["Node.js", "MongoDB", "Express"]
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking app with interactive maps",
    link: "#",
    technologies: ["React", "Weather API", "Mapbox"]
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates",
    link: "#",
    technologies: ["React", "Firebase", "Material-UI"]
  }
];

const ProjectsGrid = ({ projects = defaultProjects }) => {
  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="technologies">
            {project.technologies.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project →</a>
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;