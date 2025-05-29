import React from 'react';

const BlogImage = ({ type }) => {
  const getPattern = () => {
    switch(type) {
      case 'neural-net':
        return (
          <pattern id="neural" patternUnits="userSpaceOnUse" width="100" height="100">
            <circle cx="50" cy="50" r="2" fill="var(--neon-primary)" />
            <line x1="50" y1="50" x2="80" y2="80" stroke="var(--neon-secondary)" strokeWidth="1" />
            <line x1="50" y1="50" x2="20" y2="80" stroke="var(--neon-secondary)" strokeWidth="1" />
          </pattern>
        );
      case 'future-web':
        return (
          <pattern id="grid" patternUnits="userSpaceOnUse" width="50" height="50">
            <rect width="50" height="50" fill="none" stroke="var(--neon-primary)" strokeWidth="0.5" />
            <circle cx="25" cy="25" r="5" fill="var(--neon-secondary)" opacity="0.5" />
          </pattern>
        );
      case 'react':
        return (
          <pattern id="atoms" patternUnits="userSpaceOnUse" width="100" height="100">
            <circle cx="50" cy="50" r="20" fill="none" stroke="var(--neon-primary)" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="var(--neon-secondary)" />
          </pattern>
        );
      default:
        return null;
    }
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200">
      <defs>
        {getPattern()}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${type === 'neural-net' ? 'neural' : type === 'future-web' ? 'grid' : 'atoms'})`} />
    </svg>
  );
};

export default BlogImage;
