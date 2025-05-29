import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          © {currentYear} TWAAMBO. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#home" className="footer-link">Home</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#blog" className="footer-link">Blog</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
