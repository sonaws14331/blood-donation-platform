import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/users?role=donor', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonors(response.data.data);
      } catch (error) {
        toast.error('Failed to load donors');
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Donors Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Name</th>
              <th className="px-6 py-3 text-left font-bold">Email</th>
              <th className="px-6 py-3 text-left font-bold">Phone</th>
              <th className="px-6 py-3 text-left font-bold">Status</th>
              <th className="px-6 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{donor.firstName} {donor.lastName}</td>
                <td className="px-6 py-3">{donor.email}</td>
                <td className="px-6 py-3">{donor.phone}</td>
                <td className="px-6 py-3">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {donor.accountStatus}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button className="text-blue-600 hover:underline font-bold mr-2">View</button>
                  <button className="text-red-600 hover:underline font-bold">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donors;
