import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Blood When You Need It</h1>
          <p className="text-xl mb-8">Connect with blood donors in your area instantly</p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block"
          >
            Request Blood Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Search Available Blood</h3>
              <p className="text-gray-600">Search for blood donors by type and location in real-time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">Submit Request</h3>
              <p className="text-gray-600">Submit your blood request with medical details</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Get Approved</h3>
              <p className="text-gray-600">Get matched with verified donors quickly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">In Need of Blood?</h2>
          <p className="text-xl text-gray-600 mb-8">Register and search for blood donors now</p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 inline-block"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
