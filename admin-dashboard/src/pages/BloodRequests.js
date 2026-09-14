import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/blood-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.data || []);
      } catch (error) {
        // Handle error silently for demo
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    setApprovingId(requestId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/blood-requests/${requestId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Request approved');
      setRequests(requests.map(r => r._id === requestId ? { ...r, status: 'approved' } : r));
    } catch (error) {
      toast.error('Failed to approve request');
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Blood Requests Management</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No blood requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Blood Type</th>
                <th className="px-6 py-3 text-left font-bold">Quantity</th>
                <th className="px-6 py-3 text-left font-bold">Urgency</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-left font-bold">Requested</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-red-600">{request.bloodType}</td>
                  <td className="px-6 py-3">{request.quantity} units</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      request.urgency === 'emergency' ? 'bg-red-200 text-red-800' :
                      request.urgency === 'urgent' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      request.status === 'approved' ? 'bg-green-200 text-green-800' :
                      request.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:underline font-bold mr-2">View</button>
                    {request.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(request._id)}
                        disabled={approvingId === request._id}
                        className="text-green-600 hover:underline font-bold disabled:opacity-50"
                      >
                        {approvingId === request._id ? 'Approving...' : 'Approve'}
                      </button>
                    )}
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

export default BloodRequests;
