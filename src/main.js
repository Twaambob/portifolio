// src/main.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import NeuralBackground from './components/NeuralBackground';
import ProjectsGrid from './components/ProjectsGrid';
import ProfileImage from './components/ProfileImage';
import Blog from './components/Blog';
import Contact from './components/Contact';
import './assets/styles/main.css';

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
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);