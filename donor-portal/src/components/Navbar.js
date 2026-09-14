import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

function Navbar({ isAuthenticated, user, onLogout, onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <span>🩸</span>
            <span>Blood Donation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hover:text-red-200">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-red-600 px-4 py-2 rounded hover:bg-red-50">
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 hover:text-red-200"
                >
                  <FiUser />
                  <span>{user?.firstName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 first:rounded-t"
                    >
                      Profile
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={onMenuClick} className="md:hidden">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
