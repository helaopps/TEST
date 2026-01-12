import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaShoppingBag, FaComments, FaUserShield } from 'react-icons/fa';

const HomePage = () => {
  const { currentUser, currentRole } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock announcements data
  useEffect(() => {
    setAnnouncements([
      { id: 1, title: 'Welcome to TravelMate!', content: 'Discover amazing places with our local experts', date: '2024-01-15' },
      { id: 2, title: 'New Features Added', content: 'Check out our new trip planner and booking system', date: '2024-01-10' },
    ]);
  }, []);

  // Dashboard content based on user role
  const renderDashboardContent = () => {
    if (!currentRole) {
      return (
        <div className="role-selection-prompt">
          <h3>Select Your Role</h3>
          <p>Please select your preferred role to access the appropriate dashboard.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/role-selection')}
          >
            Select Role
          </button>
        </div>
      );
    }

    switch(currentRole) {
      case 'traveler':
        return <TravelerDashboard />;
      case 'local':
        return <LocalDashboard />;
      case 'merchant':
        return <MerchantDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'moderator':
        return <ModeratorDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <div className="home-page">
      {/* Announcement Banner */}
      <section className="announcement-banner">
        <div className="container">
          <div className="announcements-slider">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <strong>{announcement.title}</strong> - {announcement.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div className="container">
          <h1>Welcome{currentUser?.name ? `, ${currentUser.name}` : ''}!</h1>
          <p>Your {currentRole ? currentRole.charAt(0).toUpperCase() + currentRole.slice(1) : 'Travel'} Dashboard</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="dashboard-nav">
        <div className="container">
          <nav className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaUserShield /> Dashboard
            </button>
            <button 
              className={`tab-btn ${activeTab === 'trips' ? 'active' : ''}`}
              onClick={() => setActiveTab('trips')}
            >
              <FaPlane /> My Trips
            </button>
            <button 
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <FaShoppingBag /> Services
            </button>
            <button 
              className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <FaComments /> Messages
            </button>
          </nav>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="dashboard-content">
        <div className="container">
          {renderDashboardContent()}
        </div>
      </section>
    </div>
  );
};

// Dashboard Components for Different Roles
const TravelerDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-card">
      <h3>Plan My Trip</h3>
      <p>Discover destinations and plan your next adventure</p>
      <button className="btn btn-primary">Start Planning</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Search Services</h3>
      <p>Find local services, tours, and accommodations</p>
      <button className="btn btn-secondary">Browse Services</button>
    </div>
    
    <div className="dashboard-card">
      <h3>My Activities</h3>
      <p>View booked trips and joined events</p>
      <button className="btn btn-outline">View History</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Social Feed</h3>
      <p>Connect with other travelers and locals</p>
      <button className="btn btn-outline">View Feed</button>
    </div>
  </div>
);

const LocalDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-card">
      <h3>Post Services</h3>
      <p>Create and manage your service offerings</p>
      <button className="btn btn-primary">Add Service</button>
    </div>
    
    <div className="dashboard-card">
      <h3>My Bookings</h3>
      <p>Manage your accepted/rejected bookings</p>
      <button className="btn btn-secondary">View Bookings</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Revenue & Payments</h3>
      <p>Track your earnings and payments</p>
      <button className="btn btn-outline">View Analytics</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Request Feed</h3>
      <p>See incoming requests for your services</p>
      <button className="btn btn-outline">View Requests</button>
    </div>
  </div>
);

const MerchantDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-card">
      <h3>My Listings</h3>
      <p>Manage your products and services</p>
      <button className="btn btn-primary">View Listings</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Post Insights</h3>
      <p>Analytics on views, clicks, and conversions</p>
      <button className="btn btn-secondary">View Analytics</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Calendar Widget</h3>
      <p>Add schedules to your device calendar</p>
      <button className="btn btn-outline">Open Calendar</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Direct Messages</h3>
      <p>Chat with customers and clients</p>
      <button className="btn btn-outline">View Chats</button>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-stat">
      <h3>Total Posts</h3>
      <p className="stat-number">1,248</p>
    </div>
    
    <div className="dashboard-stat">
      <h3>Active Users</h3>
      <p className="stat-number">5,672</p>
    </div>
    
    <div className="dashboard-stat">
      <h3>New Bookings</h3>
      <p className="stat-number">89</p>
    </div>
    
    <div className="dashboard-stat">
      <h3>Pending Approvals</h3>
      <p className="stat-number">23</p>
    </div>
    
    <div className="dashboard-card full-width">
      <h3>Manage Posts</h3>
      <p>Moderate and manage platform content</p>
      <button className="btn btn-primary">Go to Moderation</button>
    </div>
  </div>
);

const ModeratorDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-card">
      <h3>Review Flagged Content</h3>
      <p>Examine reported posts and user content</p>
      <button className="btn btn-primary">View Reports</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Approve Posts</h3>
      <p>Review and approve pending posts</p>
      <button className="btn btn-secondary">Pending Queue</button>
    </div>
    
    <div className="dashboard-card">
      <h3>User Reports</h3>
      <p>Handle user complaints and issues</p>
      <button className="btn btn-outline">View Reports</button>
    </div>
    
    <div className="dashboard-card">
      <h3>Platform Integrity</h3>
      <p>Monitor overall platform health</p>
      <button className="btn btn-outline">View Metrics</button>
    </div>
  </div>
);

const DefaultDashboard = () => (
  <div className="dashboard-grid">
    <div className="dashboard-card full-width">
      <h3>Welcome to TravelMate</h3>
      <p>Please select your role to access the appropriate dashboard features.</p>
      <button 
        className="btn btn-primary"
        onClick={() => window.location.href = '/role-selection'}
      >
        Select Role
      </button>
    </div>
  </div>
);

export default HomePage;