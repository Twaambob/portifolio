import React, { useState, useEffect } from 'react';

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
            animationDelay: `${index * 0.2}s`
          }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="technologies">
            {(isMobile ? project.technologies.slice(0, 2) : project.technologies).map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
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