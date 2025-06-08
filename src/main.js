// src/main.js
import React, { StrictMode, Suspense, useEffect } from 'react';
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

// Error Boundary Component with improved error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff0000',
          borderRadius: '4px',
          background: 'rgba(255, 0, 0, 0.1)'
        }}>
          <h2>Something went wrong</h2>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              marginTop: '10px',
              border: 'none',
              borderRadius: '4px',
              background: '#00f7ff',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// App Component with proper error boundaries and suspense
const App = () => {
  useEffect(() => {
    // Preload critical components
    const preloadComponents = async () => {
      try {
        await Promise.all([
          import('./components/ProjectsGrid'),
          import('./components/Blog'),
          import('./components/Contact')
        ]);
      } catch (error) {
        console.error('Error preloading components:', error);
      }
    };

    preloadComponents();
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <NeuralBackground />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      <main>
        <ErrorBoundary>
          <section id="home">
            <div className="profile-image">
              <Suspense fallback={<div className="profile-image-placeholder" />}>
                <ProfileImage />
              </Suspense>
            </div>
            <h1>TWAAMBO</h1>
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
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
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="projects">
            <h2>Projects</h2>
            <Suspense fallback={<div className="loading-projects">Loading projects...</div>}>
              <ProjectsGrid />
            </Suspense>
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="blog">
            <h2>Latest Blog Posts</h2>
            <Suspense fallback={<div className="loading-blog">Loading blog posts...</div>}>
              <Blog />
            </Suspense>
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="contact">
            <h2>Contact</h2>
            <Suspense fallback={<div className="loading-contact">Loading contact information...</div>}>
              <Contact />
            </Suspense>
          </section>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<div className="loading-footer">Loading footer...</div>}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
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