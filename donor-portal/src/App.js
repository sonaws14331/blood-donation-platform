import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DonationHistory from './pages/DonationHistory';
import ScheduleAppointment from './pages/ScheduleAppointment';
import MyAppointments from './pages/MyAppointments';
import BloodBanks from './pages/BloodBanks';
import Eligibility from './pages/Eligibility';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex flex-1">
          {isAuthenticated && (
            <Sidebar isOpen={sidebarOpen} userRole="donor" />
          )}
          <main className={`flex-1 ${isAuthenticated ? 'ml-0' : ''}`}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard user={user} />} />
                  <Route path="/profile" element={<Profile user={user} />} />
                  <Route path="/donation-history" element={<DonationHistory />} />
                  <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
                  <Route path="/my-appointments" element={<MyAppointments />} />
                  <Route path="/blood-banks" element={<BloodBanks />} />
                  <Route path="/check-eligibility" element={<Eligibility />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/" />} />
              )}
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
