import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function BloodInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/blood-banks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventory(response.data.data);
      } catch (error) {
        toast.error('Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Blood Inventory Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((bank) => (
          <div key={bank._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">{bank.name}</h3>
            <div className="space-y-3">
              {bank.inventory?.map((inv) => (
                <div key={inv.bloodType} className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-bold text-red-600">{inv.bloodType}</p>
                    <p className="text-sm text-gray-600">{inv.quantity} units</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-bold ${
                    inv.status === 'available' ? 'bg-green-200 text-green-800' :
                    inv.status === 'low' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
              Update Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BloodInventory;
