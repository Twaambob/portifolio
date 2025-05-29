import React from 'react';
import BlogImage from './BlogImage';

const BlogPost = ({ post }) => {
  const getImageType = () => {
    if (post.image.includes('neural-net')) return 'neural-net';
    if (post.image.includes('future-web')) return 'future-web';
    return 'react';
  };

  return (
    <article className="blog-post">
      <div className="blog-post-image">
        <div className="category-tag">{post.category}</div>
        <div className="post-image">
          <BlogImage type={getImageType()} />
        </div>
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p className="post-preview">{post.preview}</p>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="read-time">{post.readTime} min read</span>
        </div>
        <a href={post.link} className="read-more">
          Read More <span className="arrow">→</span>
        </a>
      </div>
    </article>
  );
};

export default BlogPost;
