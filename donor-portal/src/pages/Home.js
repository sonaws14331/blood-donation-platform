import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Save Lives Through Blood Donation</h1>
          <p className="text-xl mb-8">Join our community of donors and make a difference</p>
          <Link
            to="/register"
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block"
          >
            Start Donating Today
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Donate Blood?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🩸</div>
              <h3 className="text-xl font-bold mb-2">Save Lives</h3>
              <p className="text-gray-600">Your donation can save up to three lives with a single donation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2">Quick Process</h3>
              <p className="text-gray-600">Donate in just 10-15 minutes at your nearest blood bank</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2">Health Check</h3>
              <p className="text-gray-600">Get a free health screening with every donation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">Register as a donor and schedule your appointment</p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 inline-block"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 inline-block"
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
