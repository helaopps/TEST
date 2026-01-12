import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'traveler',
        bio: 'Adventure seeker and travel enthusiast. Love exploring new cultures and cuisines.',
        location: 'Colombo, Sri Lanka',
        joinDate: 'January 2024',
        ratings: 4.8,
        followers: 120,
        following: 85,
        posts: 24,
        trips: 8
      });
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2>User Not Found</h2>
        <p>The requested user profile could not be found.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-initials">{user.name.charAt(0)}</span>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="user-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            <p className="user-location"><i className="icon-location"></i> {user.location}</p>
            <p className="user-join-date">Joined {user.joinDate}</p>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{user.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-bio">
            <h3>About</h3>
            <p>{user.bio}</p>
          </div>

          <div className="profile-highlights">
            <div className="highlight-card">
              <h4>Trip Count</h4>
              <p>{user.trips} trips</p>
            </div>
            <div className="highlight-card">
              <h4>Rating</h4>
              <p>{user.ratings}/5.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;