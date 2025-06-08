import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import { blogPosts } from '../data/blogPosts';
import useInView from '../hooks/useInView';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elementRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (isInView) {
      try {
        // Simulate loading delay and potential errors in production
        setIsLoading(true);
        setPosts(blogPosts);
      } catch (err) {
        setError(err.message);
        console.error('Error loading blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isInView]);

  if (error) {
    return (
      <div className="blog-error">
        <h3>Failed to load blog posts</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div ref={elementRef} className="blog-grid">
      {isLoading ? (
        <div className="blog-loading">Loading posts...</div>
      ) : (
        <>
          {posts.map((post, index) => (
            <BlogPost 
              key={post.title} 
              post={post} 
              style={{
                animationDelay: `${index * 100}ms`
              }}
            />
          ))}
        </>
      )}
      <div className="blog-grid-bg" />
    </div>
  );
};

export default Blog;
