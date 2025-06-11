import React from 'react';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="p-6 flex-1 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-teal-700">Bienvenue, {user?.username}</h1>
          <p>Votre rôle : <strong>{user?.role}</strong></p>
          <p className="mt-4">Utilisez le menu à gauche pour gérer les propriétaires et les patients.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
