// src/main.js
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import loadable from '@loadable/component';
import Navbar from './components/Navbar';
import './assets/styles/main.css';

// Lazy load components
const NeuralBackground = loadable(() => import('./components/NeuralBackground'), {
  fallback: null
});
const ProjectsGrid = loadable(() => import('./components/ProjectsGrid'), {
  fallback: <div>Loading projects...</div>
});
const ProfileImage = loadable(() => import('./components/ProfileImage'), {
  fallback: <div className="profile-image-placeholder"></div>
});
const Blog = loadable(() => import('./components/Blog'), {
  fallback: <div>Loading blog posts...</div>
});
const Contact = loadable(() => import('./components/Contact'), {
  fallback: <div>Loading contact information...</div>
});
const Footer = loadable(() => import('./components/Footer'), {
  fallback: <div>Loading footer...</div>
});

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
  useEffect(() => {
    // Preload critical components
    const preloadComponents = async () => {
      const componentsToPreload = [
        () => import('./components/ProjectsGrid'),
        () => import('./components/Blog'),
        () => import('./components/Contact')
      ];
      
      try {
        await Promise.all(
          componentsToPreload.map(loader => 
            loader().then(module => {
              // Component loaded successfully
            }).catch(error => {
              console.error('Error preloading component:', error);
            })
          )
        );
      } catch (error) {
        console.error('Error in preloading components:', error);
      }
    };

    // Start preloading after initial render
    const timer = setTimeout(preloadComponents, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Suspense fallback={null}>
        <NeuralBackground />
      </Suspense>
      <Navbar />
      <main>
        <section id="home">
          <div className="profile-image">
            <Suspense fallback={<div className="profile-image-placeholder" />}>
              <ProfileImage />
            </Suspense>
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
          <Suspense fallback={<div className="loading-projects">Loading projects...</div>}>
            <ProjectsGrid />
          </Suspense>
        </section>
        <section id="blog">
          <h2>Latest Blog Posts</h2>
          <Suspense fallback={<div className="loading-blog">Loading blog posts...</div>}>
            <Blog />
          </Suspense>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <Suspense fallback={<div className="loading-contact">Loading contact information...</div>}>
            <Contact />
          </Suspense>
        </section>
      </main>
      <Suspense fallback={<div className="loading-footer">Loading footer...</div>}>
        <Footer />
      </Suspense>
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
          <SpeedInsights />
        </ErrorBoundary>
      </StrictMode>
    );

    // Report web vitals
    import('./utils/webVitals').then(({ default: reportWebVitals }) => {
      reportWebVitals(({ name, value, id }) => {
        console.log(`Web Vital: ${name} = ${value}`);
        // You can send these metrics to your analytics service
      });
    });
  } catch (error) {
    console.error('Failed to render React application:', error);
  }
});