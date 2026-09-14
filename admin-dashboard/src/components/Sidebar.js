import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiDroplet, FiList, FiFileText, FiSettings, FiTrendingUp } from 'react-icons/fi';

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiUsers, label: 'All Users', path: '/users' },
    { icon: FiDroplet, label: 'Donors', path: '/donors' },
    { icon: FiList, label: 'Recipients', path: '/recipients' },
    { icon: FiTrendingUp, label: 'Blood Inventory', path: '/blood-inventory' },
    { icon: FiFileText, label: 'Blood Requests', path: '/blood-requests' },
    { icon: FiDroplet, label: 'Donations', path: '/donations' },
    { icon: FiFileText, label: 'Reports', path: '/reports' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`${
      isOpen ? 'w-64' : 'w-20'
    } bg-gray-900 text-white transition-all duration-300 overflow-y-auto`}>
      <div className="p-4">
        <h2 className={`${isOpen ? 'block' : 'hidden'} text-2xl font-bold mb-8`}>
          🏥 Blood
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors group"
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && (
                  <span className="group-hover:text-purple-300 transition">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
