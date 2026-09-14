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
import SearchBlood from './pages/SearchBlood';
import RequestBlood from './pages/RequestBlood';
import MyRequests from './pages/MyRequests';
import FindBloodBanks from './pages/FindBloodBanks';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
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
            <Sidebar isOpen={sidebarOpen} userRole="recipient" />
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
                  <Route path="/search-blood" element={<SearchBlood />} />
                  <Route path="/request-blood" element={<RequestBlood />} />
                  <Route path="/my-requests" element={<MyRequests />} />
                  <Route path="/find-blood-banks" element={<FindBloodBanks />} />
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
