import React from 'react';
import OwnerList from '../components/owners/OwnerList';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Owners = () => {
  const { user } = useAuth();
  const canAdd = user?.role === 'admin' || user?.role === 'receptionist';

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-700">Gestion des propriétaires</h1>
      </div>
      <OwnerList />
    </div>
  );
};

export default Owners;
