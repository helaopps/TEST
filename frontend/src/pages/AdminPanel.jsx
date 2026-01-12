import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Mock data
  useEffect(() => {
    // Mock posts data
    setPosts([
      { id: 1, title: 'Amazing Cultural Tour', author: 'John Doe', status: 'approved', type: 'experience', createdAt: '2024-01-15' },
      { id: 2, title: 'Jewelry for Sale', author: 'Sarah Smith', status: 'pending', type: 'shopping', createdAt: '2024-01-14' },
      { id: 3, title: 'Lost Camera', author: 'Mike Johnson', status: 'rejected', type: 'lost-found', createdAt: '2024-01-13' },
      { id: 4, title: 'Volunteer Opportunity', author: 'Emma Wilson', status: 'pending', type: 'volunteer', createdAt: '2024-01-12' },
    ]);
    
    // Mock users data
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'traveler', status: 'active', joinDate: '2024-01-01' },
      { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'local', status: 'active', joinDate: '2024-01-02' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'merchant', status: 'banned', joinDate: '2024-01-03' },
      { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'traveler', status: 'active', joinDate: '2024-01-04' },
    ]);
    
    // Mock bookings data
    setBookings([
      { id: 1, service: 'Cultural Tour', customer: 'Alice Brown', status: 'confirmed', date: '2024-01-20', amount: 150 },
      { id: 2, service: 'Jewelry Purchase', customer: 'Bob Davis', status: 'completed', date: '2024-01-18', amount: 85 },
      { id: 3, service: 'Car Rental', customer: 'Carol Taylor', status: 'pending', date: '2024-01-22', amount: 120 },
    ]);
    
    // Mock announcements data
    setAnnouncements([
      { id: 1, title: 'Welcome to TravelMate', content: 'Our new platform is now live!', date: '2024-01-01', status: 'active' },
      { id: 2, title: 'New Features', content: 'Trip planner is now available', date: '2024-01-10', status: 'scheduled' },
    ]);
  }, []);

  const stats = {
    totalPosts: posts.length,
    pendingPosts: posts.filter(p => p.status === 'pending').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalBookings: bookings.length,
    revenue: bookings.reduce((sum, b) => sum + b.amount, 0)
  };

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: action } : post
    ));
  };

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: action } : user
    ));
  };

  return (
    <div className="admin-panel-container">
      <div className="container">
        <h1>Admin Panel</h1>
        <p>Manage platform content, users, and bookings</p>
        
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Manage Posts
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Posts</h3>
                <p className="stat-number">{stats.totalPosts}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Posts</h3>
                <p className="stat-number">{stats.pendingPosts}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-number">{stats.activeUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-number">{stats.totalBookings}</p>
              </div>
              <div className="stat-card">
                <h3>Revenue</h3>
                <p className="stat-number">${stats.revenue}</p>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-type">New Post</span>
                  <span className="activity-desc">John Doe created a new experience post</span>
                  <span className="activity-time">2 min ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-type">New Booking</span>
                  <span className="activity-desc">Alice booked a cultural tour</span>
                  <span className="activity-time">15 min ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-type">User Registered</span>
                  <span className="activity-desc">Emma Wilson joined as a traveler</span>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'posts' && (
          <div className="admin-posts">
            <h2>Manage Posts</h2>
            <div className="posts-filters">
              <select>
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <select>
                <option>All Types</option>
                <option>Experience</option>
                <option>Shopping</option>
                <option>Event</option>
                <option>Lost & Found</option>
              </select>
            </div>
            
            <div className="posts-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.author}</td>
                      <td>{post.type}</td>
                      <td>
                        <span className={`status-badge ${post.status}`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td>{post.createdAt}</td>
                      <td>
                        {post.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success"
                              onClick={() => handlePostAction(post.id, 'approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-danger"
                              onClick={() => handlePostAction(post.id, 'rejected')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button className="btn btn-outline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="admin-users">
            <h2>Manage Users</h2>
            <div className="users-filters">
              <select>
                <option>All Roles</option>
                <option>Traveler</option>
                <option>Local</option>
                <option>Merchant</option>
                <option>Admin</option>
              </select>
              <select>
                <option>All Statuses</option>
                <option>Active</option>
                <option>Banned</option>
              </select>
            </div>
            
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        {user.status === 'active' ? (
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleUserAction(user.id, 'banned')}
                          >
                            Ban
                          </button>
                        ) : (
                          <button 
                            className="btn btn-success"
                            onClick={() => handleUserAction(user.id, 'active')}
                          >
                            Activate
                          </button>
                        )}
                        <button className="btn btn-outline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'bookings' && (
          <div className="admin-bookings">
            <h2>Manage Bookings</h2>
            <div className="bookings-filters">
              <select>
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.service}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.date}</td>
                      <td>${booking.amount}</td>
                      <td>
                        <span className={`status-badge ${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary">View</button>
                        <button className="btn btn-outline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'announcements' && (
          <div className="admin-announcements">
            <h2>Manage Announcements</h2>
            <button className="btn btn-primary">Create New Announcement</button>
            
            <div className="announcements-list">
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <h3>{announcement.title}</h3>
                  <p>{announcement.content}</p>
                  <div className="announcement-meta">
                    <span>Date: {announcement.date}</span>
                    <span className={`status-badge ${announcement.status}`}>
                      {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                    </span>
                  </div>
                  <div className="announcement-actions">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-outline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;