import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

function FindBloodBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const params = searchCity ? { city: searchCity } : {};
        const response = await axios.get('/api/blood-banks', { params });
        setBanks(response.data.data);
      } catch (error) {
        toast.error('Failed to load blood banks');
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, [searchCity]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Find Blood Banks</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {banks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No blood banks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.map((bank) => (
            <div key={bank._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4">{bank.name}</h3>
              
              <div className="space-y-3 mb-4 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <FiMapPin className="mt-1 flex-shrink-0" />
                  <div>
                    <p>{bank.address?.street}</p>
                    <p>{bank.address?.city}, {bank.address?.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <FiPhone />
                  <p>{bank.phone}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold mb-2">Available Blood:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {bank.inventory?.slice(0, 4).map((inv) => (
                    <div key={inv.bloodType} className={`p-2 rounded ${
                      inv.status === 'available' ? 'bg-green-100' :
                      inv.status === 'low' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <p className="font-bold text-red-600">{inv.bloodType}</p>
                      <p className="text-gray-600">{inv.quantity} units</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/request-blood"
                className="w-full bg-blue-600 text-white py-2 rounded text-center font-bold hover:bg-blue-700 inline-block"
              >
                Request Blood
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindBloodBanks;
