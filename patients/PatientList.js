import React, { useEffect, useState } from 'react';
import patientService from '../../services/patientService';
import { formatDate, formatWeight } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    patientService.getAll().then(res => setPatients(res.data));
  }, []);

  const canManage = user?.role === 'vet';
  const canView = ['admin', 'vet', 'receptionist'].includes(user?.role);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des patients</h2>
        {canManage && (
          <Link to="/patients/new" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            ➕ Ajouter un patient
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Type</th>
              <th className="p-2">Race</th>
              <th className="p-2">Sexe</th>
              <th className="p-2">Poids</th>
              <th className="p-2">Naissance</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.type}</td>
                <td className="p-2">{patient.race}</td>
                <td className="p-2">{patient.sex}</td>
                <td className="p-2">{formatWeight(patient.weight)}</td>
                <td className="p-2">{formatDate(patient.date_of_birth)}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <Link to={`/patients/${patient.id}`} className="text-teal-600 underline">
                    Détails
                  </Link>
                  {canManage && (
                    <>
                      <Link to={`/patients/edit/${patient.id}`} className="text-blue-600 underline">
                        Modifier
                      </Link>
                      <Link to={`/patients/delete/${patient.id}`} className="text-red-600 underline">
                        Supprimer
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
