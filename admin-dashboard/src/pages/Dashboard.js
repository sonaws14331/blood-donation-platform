import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUsers, FiDroplet, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRecipients: 0,
    totalDonations: 0,
    requestsFulfilled: 0,
    bloodTypeDistribution: {},
  });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/admin/statistics?period=${period}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.data);
      } catch (error) {
        toast.error('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const bloodData = Object.entries(stats.bloodTypeDistribution || {}).map(([type, count]) => ({
    name: type,
    units: count,
  }));

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded bg-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-bold">Total Donors</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalDonors}</p>
            </div>
            <FiUsers className="text-4xl text-blue-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-bold">Total Recipients</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalRecipients}</p>
            </div>
            <FiUsers className="text-4xl text-purple-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-bold">Total Donations</p>
              <p className="text-3xl font-bold text-red-600">{stats.totalDonations}</p>
            </div>
            <FiDroplet className="text-4xl text-red-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-bold">Fulfilled Requests</p>
              <p className="text-3xl font-bold text-green-600">{stats.requestsFulfilled}</p>
            </div>
            <FiCheckCircle className="text-4xl text-green-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blood Type Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Blood Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donation Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Donation Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { name: 'Week 1', donations: 45 },
              { name: 'Week 2', donations: 52 },
              { name: 'Week 3', donations: 48 },
              { name: 'Week 4', donations: 61 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="donations" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
