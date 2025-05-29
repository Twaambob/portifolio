// src/main.js
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import NeuralBackground from './components/NeuralBackground';
import ProjectsGrid from './components/ProjectsGrid';
import ProfileImage from './components/ProfileImage';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './assets/styles/main.css';

console.log('React application starting...');

// Add error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <div>
      <NeuralBackground />
      <Navbar />
      <main>
        <section id="home">
          <div className="profile-image">
            <ProfileImage />
          </div>
          <h1>TWAAMBO</h1>
        </section>
        <section id="about">
          <h2>About Me</h2>
          <p>I'm a passionate full-stack developer with expertise in modern web technologies.</p>
          <p>Specializing in building innovative and responsive web applications using React, Node.js, and cutting-edge tools.</p>
          <div className="skills">
            <h3>Skills</h3>
            <ul>
              <li>Frontend: React, JavaScript, HTML5, CSS3</li>
              <li>Backend: Node.js, Python</li>
              <li>Tools: Git, Webpack, VS Code</li>
            </ul>
          </div>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <ProjectsGrid />
        </section>
        <section id="blog">
          <h2>Latest Blog Posts</h2>
          <Blog />
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Initialize React when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Root element not found in the DOM');
    return;
  }
  
  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('React application mounted successfully');
  } catch (error) {
    console.error('Failed to render React application:', error);
  }
});