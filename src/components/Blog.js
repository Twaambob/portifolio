import React from 'react';
import BlogPost from './BlogPost';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  return (
    <div className="blog-grid">
      {blogPosts.map((post, index) => (
        <BlogPost key={index} post={post} />
      ))}
      <div className="blog-grid-bg" />
    </div>
  );
};

export default Blog;
