import React, { useState, useEffect, useRef } from 'react';

// Default projects data
const defaultProjects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Neural Network background animations",
    link: "#",
    technologies: ["React", "JavaScript", "CSS3"],
    image: "portfolio-preview.jpg"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management",
    link: "#",
    technologies: ["Node.js", "MongoDB", "Express"],
    image: "ecommerce-preview.jpg"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking app with interactive maps",
    link: "#",
    technologies: ["React", "Weather API", "Mapbox"],
    image: "weather-preview.jpg"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates",
    link: "#",
    technologies: ["React", "Firebase", "Material-UI"],
    image: "task-preview.jpg"
  }
];

const ProjectsGrid = ({ projects = defaultProjects }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProjects(prev => 
              [...new Set([...prev, ...projects.slice(0, prev.length + 4)])]
            );
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    window.addEventListener('resize', handleResize);
    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    // Initial load of first batch
    setVisibleProjects(projects.slice(0, 4));

    return () => {
      window.removeEventListener('resize', handleResize);
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [projects]);

  return (
    <div className="projects-grid" ref={gridRef}>
      {visibleProjects.map((project, index) => (
        <div 
          className="project-card fade-in" 
          key={project.title}
          style={{ 
            animationDelay: `${index * 0.2}s`,
            backgroundColor: 'rgba(8, 8, 8, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 247, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{ color: 'var(--neon-primary)' }}>{project.title}</h3>
          <p style={{ color: 'var(--text-primary)' }}>{project.description}</p>
          <div className="technologies">
            {(isMobile ? project.technologies.slice(0, 2) : project.technologies).map((tech, i) => (
              <span 
                key={i} 
                className="tech-tag"
                style={{
                  backgroundColor: 'rgba(123, 47, 247, 0.3)',
                  color: 'var(--neon-primary)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                }}
              >
                {tech}
              </span>
            ))}
            {isMobile && project.technologies.length > 2 && (
              <span className="tech-tag">+{project.technologies.length - 2}</span>
            )}
          </div>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-project"
            style={{
              color: 'var(--neon-primary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            View Project <span className="arrow">→</span>
          </a>
        </div>
      ))}
      {visibleProjects.length < projects.length && (
        <div className="loading-projects" />
      )}
    </div>
  );
};

export default ProjectsGrid;