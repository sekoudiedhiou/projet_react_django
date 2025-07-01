import React from 'react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Clinique Vétérinaire</h1>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm">
              Connecté : <strong>{user.username}</strong> ({user.role})
            </span>
            <button
              onClick={logout}
              className="bg-white text-teal-700 px-3 py-1 rounded hover:bg-teal-100"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
