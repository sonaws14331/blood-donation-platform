import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhoneCall, FiDroplets } from 'react-icons/fi';

function SearchBlood() {
  const [bloodType, setBloodType] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = {};
      if (bloodType) params.bloodType = bloodType;
      if (city) params.city = city;

      const response = await axios.get('/api/blood-requests/search-blood', { params });
      setResults(response.data.data);
      if (response.data.data.length === 0) {
        toast.info('No blood banks found with available stock');
      }
    } catch (error) {
      toast.error('Failed to search blood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Search for Blood</h1>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-2xl">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Blood Type</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Blood'}
          </button>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result) => (
            <div key={result.bloodBankId} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4">{result.bloodBankName}</h3>
              
              <div className="space-y-3 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiDroplets className="text-red-600" />
                  <p className="font-bold text-red-600">{result.bloodType}</p>
                  <p className="text-gray-700">{result.availableUnits} units available</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <FiMapPin className="mt-1 flex-shrink-0" />
                  <div>
                    <p>{result.address?.street}</p>
                    <p>{result.address?.city}, {result.address?.state}</p>
                  </div>
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
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No blood banks found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}

export default SearchBlood;
