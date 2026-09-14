import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/donors/donations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data.data);
      } catch (error) {
        toast.error('Failed to load donation history');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Donation History</h1>

      {donations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No donations yet. Schedule your first donation today!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Date</th>
                <th className="px-6 py-3 text-left font-bold">Blood Type</th>
                <th className="px-6 py-3 text-left font-bold">Quantity</th>
                <th className="px-6 py-3 text-left font-bold">Blood Bank</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{new Date(donation.donationDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{donation.bloodType}</td>
                  <td className="px-6 py-3">{donation.quantity} ml</td>
                  <td className="px-6 py-3">{donation.bloodBank?.name || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      donation.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DonationHistory;
