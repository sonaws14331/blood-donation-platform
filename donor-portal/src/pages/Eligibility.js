import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Eligibility() {
  const [formData, setFormData] = useState({
    weight: '',
    recentTravel: false,
    currentMedications: '',
    lastDonationDate: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/donors/check-eligibility', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
    } catch (error) {
      toast.error('Failed to check eligibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Check Donation Eligibility</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Current Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your weight"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Last Donation Date</label>
              <input
                type="date"
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Current Medications</label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="List any current medications"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="recentTravel"
                checked={formData.recentTravel}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Recent international travel (past 3 months)</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Eligibility'}
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-lg shadow p-6 ${
            result.eligible ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              result.eligible ? 'text-green-700' : 'text-red-700'
            }`}>
              {result.eligible ? '✓ You Are Eligible!' : '✗ Not Eligible'}
            </h2>
            <p className="text-gray-700 mb-4">{result.reason}</p>
            {result.nextEligibleDate && (
              <p className="text-gray-700">
                <strong>Next Eligible Date:</strong> {new Date(result.nextEligibleDate).toLocaleDateString()}
              </p>
            )}
            {result.eligible && (
              <a
                href="/schedule-appointment"
                className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-bold"
              >
                Schedule Appointment
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Eligibility;
