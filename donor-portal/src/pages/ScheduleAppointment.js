import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ScheduleAppointment() {
  const [formData, setFormData] = useState({
    bloodBankId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const response = await axios.get('/api/blood-banks');
        setBloodBanks(response.data.data);
      } catch (error) {
        toast.error('Failed to load blood banks');
      }
    };

    fetchBloodBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/appointments/schedule', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Appointment scheduled successfully!');
      setFormData({ bloodBankId: '', appointmentDate: '', appointmentTime: '', notes: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Schedule Appointment</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Select Blood Bank</label>
            <select
              name="bloodBankId"
              value={formData.bloodBankId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Choose a blood bank</option>
              {bloodBanks.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.name} - {bank.address?.city}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Time</label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
              placeholder="Any special requests or notes?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
