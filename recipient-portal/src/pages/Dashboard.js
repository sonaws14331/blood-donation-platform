import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    status: 'verified',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/recipients/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.data);
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.firstName}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-bold mb-2">Total Requests</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-bold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-bold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approvedRequests}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-bold mb-2">Status</h3>
          <p className="text-2xl font-bold text-green-600 capitalize">{stats.status}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/search-blood" className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-center">
            Search Blood
          </a>
          <a href="/request-blood" className="bg-red-600 text-white p-4 rounded hover:bg-red-700 text-center">
            Request Blood
          </a>
          <a href="/find-blood-banks" className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-center">
            Find Blood Banks
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
