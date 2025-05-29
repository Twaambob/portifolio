import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
  );
};

export default Navbar;