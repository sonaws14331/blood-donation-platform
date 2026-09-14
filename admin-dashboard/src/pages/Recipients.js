import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/users?role=recipient', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipients(response.data.data);
      } catch (error) {
        toast.error('Failed to load recipients');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  const handleVerify = async (recipientId) => {
    setVerifyingId(recipientId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/recipients/${recipientId}/verify`,
        { verificationStatus: 'verified' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Recipient verified successfully');
      setRecipients(recipients.map(r => r._id === recipientId ? { ...r, verificationStatus: 'verified' } : r));
    } catch (error) {
      toast.error('Failed to verify recipient');
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Recipients Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Name</th>
              <th className="px-6 py-3 text-left font-bold">Email</th>
              <th className="px-6 py-3 text-left font-bold">Blood Type</th>
              <th className="px-6 py-3 text-left font-bold">Verification</th>
              <th className="px-6 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{recipient.firstName} {recipient.lastName}</td>
                <td className="px-6 py-3">{recipient.email}</td>
                <td className="px-6 py-3 font-bold text-red-600">{recipient.bloodTypeNeeded || 'N/A'}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    recipient.verificationStatus === 'verified' ? 'bg-green-200 text-green-800' :
                    recipient.verificationStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {recipient.verificationStatus}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button className="text-blue-600 hover:underline font-bold mr-2">View</button>
                  {recipient.verificationStatus === 'pending' && (
                    <button
                      onClick={() => handleVerify(recipient._id)}
                      disabled={verifyingId === recipient._id}
                      className="text-green-600 hover:underline font-bold disabled:opacity-50"
                    >
                      {verifyingId === recipient._id ? 'Verifying...' : 'Verify'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recipients;
