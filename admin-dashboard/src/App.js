import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Donors from './pages/Donors';
import Recipients from './pages/Recipients';
import BloodInventory from './pages/BloodInventory';
import BloodRequests from './pages/BloodRequests';
import Donations from './pages/Donations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        setIsAuthenticated(true);
        setUser(parsedUser);
      }
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
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        )}
        <div className="flex-1 flex flex-col">
          {isAuthenticated && (
            <Navbar
              user={user}
              onLogout={handleLogout}
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            />
          )}
          <main className="flex-1 overflow-auto">
            <Routes>
              {!isAuthenticated ? (
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/donors" element={<Donors />} />
                  <Route path="/recipients" element={<Recipients />} />
                  <Route path="/blood-inventory" element={<BloodInventory />} />
                  <Route path="/blood-requests" element={<BloodRequests />} />
                  <Route path="/donations" element={<Donations />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </>
              )}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
