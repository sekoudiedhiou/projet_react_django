import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/owners', label: 'Propriétaires' },
    { to: '/patients', label: 'Patients' },
  ];

  const canView = (link) => {
    if (!user) return false;
    if (link.to === '/owners') return ['admin', 'receptionist', 'vet'].includes(user.role);
    if (link.to === '/patients') return ['admin', 'vet', 'receptionist'].includes(user.role);
    return true;
  };

  return (
    <aside className="bg-white w-60 h-full border-r p-4 shadow-sm">
      <nav className="flex flex-col gap-3">
        {links.map((link) =>
          canView(link) ? (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:bg-teal-100 py-2 px-3 rounded transition"
            >
              {link.label}
            </Link>
          ) : null
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
