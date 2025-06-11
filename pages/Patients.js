import React from 'react';
import PatientList from '../components/patients/PatientList';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Patients = () => {
  const { user } = useAuth();
  const canAdd = user?.role === 'vet'; // seul le vétérinaire peut ajouter

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-700">Gestion des patients</h1>
      </div>
      <PatientList />
    </div>
  );
};

export default Patients;
