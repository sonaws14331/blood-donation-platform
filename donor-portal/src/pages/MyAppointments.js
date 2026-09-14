import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/appointments/my-appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data.data);
      } catch (error) {
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/appointments/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Appointment cancelled');
        setAppointments(appointments.filter((a) => a._id !== appointmentId));
      } catch (error) {
        toast.error('Failed to cancel appointment');
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">No appointments scheduled</p>
          <a href="/schedule-appointment" className="text-red-600 font-bold hover:underline">
            Schedule an appointment
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">{appointment.bloodBank?.name}</h3>
              <div className="space-y-2 mb-4">
                <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p><strong>Status:</strong> <span className={`font-bold ${
                  appointment.status === 'scheduled' ? 'text-blue-600' : 'text-gray-600'
                }`}>{appointment.status}</span></p>
              </div>
              <button
                onClick={() => handleCancel(appointment._id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
