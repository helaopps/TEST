import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking authentication status on app load
  useEffect(() => {
    // In a real app, this would check for a token in localStorage/sessionStorage
    const storedUser = localStorage.getItem('travelmate_user');
    const storedRole = localStorage.getItem('travelmate_role');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    if (storedRole) {
      setCurrentRole(storedRole);
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: 'user123',
            name: 'Test User',
            email: email
          };
          
          setCurrentUser(user);
          localStorage.setItem('travelmate_user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: 'user123',
            name: name,
            email: email
          };
          
          setCurrentUser(user);
          localStorage.setItem('travelmate_user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    localStorage.removeItem('travelmate_user');
    localStorage.removeItem('travelmate_role');
  };

  const value = {
    currentUser,
    currentRole,
    setCurrentRole,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}