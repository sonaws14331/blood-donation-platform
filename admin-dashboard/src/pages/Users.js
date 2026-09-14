import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ role: 'all', status: 'all' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const params = {};
        if (filters.role !== 'all') params.role = filters.role;
        if (filters.status !== 'all') params.status = filters.status;

        const response = await axios.get('/api/admin/users', {
          params,
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.data);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filters]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Role</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="all">All Roles</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Name</th>
              <th className="px-6 py-3 text-left font-bold">Email</th>
              <th className="px-6 py-3 text-left font-bold">Role</th>
              <th className="px-6 py-3 text-left font-bold">Status</th>
              <th className="px-6 py-3 text-left font-bold">Joined</th>
              <th className="px-6 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3 capitalize">{user.role}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    user.accountStatus === 'active' ? 'bg-green-200 text-green-800' :
                    user.accountStatus === 'inactive' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {user.accountStatus}
                  </span>
                </td>
                <td className="px-6 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">
                  <button className="text-blue-600 hover:underline font-bold">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
