import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simulate fetching post data
    setTimeout(() => {
      setPost({
        id: postId,
        title: 'Amazing Cultural Tour Experience',
        content: 'Just had the most incredible cultural tour with local guides. Visited ancient temples, learned traditional crafts, and tasted authentic cuisine. Highly recommend!',
        author: {
          id: 'user123',
          name: 'Sarah Johnson',
          avatar: 'https://via.placeholder.com/50x50',
          location: 'San Francisco, USA',
          rating: 4.8
        },
        type: 'experience',
        category: 'tourism',
        images: [
          'https://via.placeholder.com/600x400',
          'https://via.placeholder.com/600x400',
          'https://via.placeholder.com/600x400'
        ],
        likes: 42,
        commentsCount: 8,
        shares: 5,
        createdAt: '2024-01-15T10:30:00Z',
        location: 'Kandy, Sri Lanka',
        tags: ['culture', 'tourism', 'experience']
      });

      setComments([
        {
          id: 1,
          author: { name: 'Local Guide', avatar: 'https://via.placeholder.com/40x40' },
          content: 'Thank you for the wonderful review! We\'re glad you enjoyed your visit.',
          createdAt: '2024-01-15T12:15:00Z'
        },
        {
          id: 2,
          author: { name: 'Mike Chen', avatar: 'https://via.placeholder.com/40x40' },
          content: 'This looks amazing! Adding it to my travel list.',
          createdAt: '2024-01-15T14:30:00Z'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [postId]);

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: { name: 'Current User', avatar: 'https://via.placeholder.com/40x40' },
        content: newComment,
        createdAt: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setPost(prev => ({
        ...prev,
        commentsCount: prev.commentsCount + 1
      }));
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post Not Found</h2>
        <p>The requested post could not be found.</p>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="container">
        <article className="post-detail">
          <header className="post-header">
            <div className="author-info">
              <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
              <div className="author-details">
                <h3>{post.author.name}</h3>
                <p className="author-location">{post.location}</p>
                <p className="post-date">
                  {new Date(post.createdAt).toLocaleDateString()} • ★ {post.author.rating}
                </p>
              </div>
            </div>
          </header>

          <div className="post-content">
            <h1>{post.title}</h1>
            <p className="post-body">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt={`${post.title} - Image ${index + 1}`} />
                ))}
              </div>
            )}

            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          </div>

          <footer className="post-interactions">
            <div className="interaction-buttons">
              <button className="interaction-btn" onClick={handleLike}>
                <i className="icon-like"></i> {post.likes} Likes
              </button>
              <button className="interaction-btn">
                <i className="icon-comment"></i> {post.commentsCount} Comments
              </button>
              <button className="interaction-btn">
                <i className="icon-share"></i> {post.shares} Shares
              </button>
            </div>
          </footer>
        </article>

        <div className="comments-section">
          <h3>Comments ({post.commentsCount})</h3>
          
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
                <div className="comment-content">
                  <h4>{comment.author.name}</h4>
                  <p>{comment.content}</p>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;