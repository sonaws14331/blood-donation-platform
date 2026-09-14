import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/blood-requests/my-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.data);
      } catch (error) {
        toast.error('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Blood Requests</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">No requests yet</p>
          <a href="/request-blood" className="text-blue-600 font-bold hover:underline">
            Create a new request
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div key={request._id} className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Request #{request._id.substring(0, 8)}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Blood Type:</strong> {request.bloodType}</p>
                  <p><strong>Quantity:</strong> {request.quantity} units</p>
                  <p><strong>Urgency:</strong> <span className={`font-bold ${
                    request.urgency === 'emergency' ? 'text-red-600' :
                    request.urgency === 'urgent' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>{request.urgency}</span></p>
                  <p><strong>Status:</strong> <span className={`font-bold ${
                    request.status === 'approved' ? 'text-green-600' :
                    request.status === 'fulfilled' ? 'text-blue-600' :
                    request.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>{request.status}</span></p>
                  <p><strong>Needed By:</strong> {new Date(request.neededBy).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;
