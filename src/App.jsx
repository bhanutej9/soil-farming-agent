import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ContactDeveloper from './pages/ContactDeveloper';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './App.css';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track admin login state
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track user login state

  // Handle admin login
  const handleAdminLogin = () => {
    setIsAdmin(true); // Set to true after successful admin login
  };

  // Handle user login
  const handleUserLogin = () => {
    setIsUserLoggedIn(true); // Set to true after successful user login
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdmin(false); // Set to false when admin logs out
  };

  // Handle user logout
  const handleUserLogout = () => {
    setIsUserLoggedIn(false); // Set to false when user logs out
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
        <Route path="/contact-developer" element={<ContactDeveloper />} />
            
        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={<AdminLogin onLogin={handleAdminLogin} isAdmin={isAdmin} />}
        />

        {/* Protect Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            isAdmin ? (
              <AdminDashboard onLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        {/* Protect User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            isUserLoggedIn ? (
              <UserDashboard onLogout={handleUserLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
