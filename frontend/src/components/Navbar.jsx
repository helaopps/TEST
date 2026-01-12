import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in (in a real app, this would check localStorage/JWT)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // In a real app, you would decode the JWT to get user info
      setUserRole('traveler'); // Placeholder
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          TravelMate
        </Link>
        
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/services" className="nav-link">
            Services
          </Link>
          <Link to="/trip-planner" className="nav-link">
            Trip Planner
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/chat" className="nav-link">
                Messages
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        <div className="nav-right">
          {isLoggedIn && (
            <>
              <Link to="/notifications" className="nav-icon">
                <FaBell />
              </Link>
              <Link to="/profile" className="nav-icon">
                <FaUser />
              </Link>
            </>
          )}
          
          <div className="hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/services" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Services
            </Link>
            <Link to="/trip-planner" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Trip Planner
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  Dashboard
                </Link>
                <Link to="/chat" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  Messages
                </Link>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;