import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, currentRole } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1>Dashboard</h1>
        <p>Welcome to your {currentRole || 'Traveler'} dashboard, {currentUser?.name || 'User'}!</p>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <ul>
              <li>Total Posts: 0</li>
              <li>Followers: 0</li>
              <li>Following: 0</li>
              <li>Trips: 0</li>
            </ul>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>No recent activity yet.</p>
          </div>
          
          <div className="dashboard-card full-width">
            <h3>Upcoming Trips</h3>
            <p>No upcoming trips scheduled.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;