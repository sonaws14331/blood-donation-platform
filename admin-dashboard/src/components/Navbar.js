import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';

function Navbar({ user, onLogout, onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onMenuClick}
            className="text-white hover:text-purple-200 transition"
          >
            <FiMenu size={24} />
          </button>

          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:text-purple-200 transition"
            >
              <FiUser />
              <span>{user?.firstName}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 first:rounded-t"
                >
                  <FiSettings />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b flex items-center space-x-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
