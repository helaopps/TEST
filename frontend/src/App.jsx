import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/App.css';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import TripPlanner from './pages/TripPlanner';
import ServicesMarketplace from './pages/ServicesMarketplace';
import PostDetail from './pages/PostDetail';
import BookingPage from './pages/BookingPage';
import ChatPage from './pages/ChatPage';
import AdminPanel from './pages/AdminPanel';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/services" element={<ServicesMarketplace />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/booking/:serviceId" element={<BookingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;