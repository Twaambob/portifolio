import React, { memo, useMemo } from 'react';
import BlogImage from './BlogImage';
import useInView from '../hooks/useInView';

const BlogPost = memo(({ post, style }) => {
  const [elementRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const imageType = useMemo(() => {
    if (post.image.includes('neural-net')) return 'neural-net';
    if (post.image.includes('future-web')) return 'future-web';
    return 'react';
  }, [post.image]);

  return (
    <article 
      ref={elementRef}
      className={`blog-post ${isInView ? 'visible' : ''}`}
      style={style}
    >
      <div className="blog-post-image">
        <div className="category-tag">{post.category}</div>
        <div className="post-image">
          {isInView && <BlogImage type={imageType} />}
        </div>
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p className="post-preview">{post.preview}</p>
        <div className="post-meta">
          <time dateTime={new Date(post.date).toISOString()} className="post-date">
            {post.date}
          </time>
          <span className="read-time">{post.readTime} min read</span>
        </div>
        <a 
          href={post.link} 
          className="read-more"
          rel="noopener noreferrer"
          aria-label={`Read more about ${post.title}`}
        >
          Read More <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the post content changes
  return prevProps.post.title === nextProps.post.title;
});
};

export default BlogPost;
