import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Blood Donation Platform',
    supportEmail: 'support@blooddonation.com',
    emergencyHotline: '1-800-BLOOD-HELP',
    maxDonationsPerYear: 5,
    minDaysBeforeDonation: 56,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate save
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Emergency Hotline</label>
              <input
                type="text"
                name="emergencyHotline"
                value={settings.emergencyHotline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Max Donations Per Year</label>
                <input
                  type="number"
                  name="maxDonationsPerYear"
                  value={settings.maxDonationsPerYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Min Days Before Donation</label>
                <input
                  type="number"
                  name="minDaysBeforeDonation"
                  value={settings.minDaysBeforeDonation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">System Information</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-600">Platform Version</p>
              <p className="font-bold">1.0.0</p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated</p>
              <p className="font-bold">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Database Status</p>
              <p className="font-bold text-green-600">✓ Connected</p>
            </div>
            <div>
              <p className="text-gray-600">API Status</p>
              <p className="font-bold text-green-600">✓ Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
