import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiMapPin, FiActivity, FiCheckCircle } from 'react-icons/fi';

function Sidebar({ isOpen, userRole }) {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiUser, label: 'Profile', path: '/profile' },
    { icon: FiCalendar, label: 'Schedule Appointment', path: '/schedule-appointment' },
    { icon: FiCalendar, label: 'My Appointments', path: '/my-appointments' },
    { icon: FiMapPin, label: 'Blood Banks', path: '/blood-banks' },
    { icon: FiActivity, label: 'Donation History', path: '/donation-history' },
    { icon: FiCheckCircle, label: 'Check Eligibility', path: '/check-eligibility' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 hidden md:block`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
