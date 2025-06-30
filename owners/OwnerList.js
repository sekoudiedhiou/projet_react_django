import React, { useEffect, useState } from 'react';
import ownerService from '../../services/ownerService';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    ownerService.getAll().then(res => setOwners(res.data));
  }, []);

  const canManage = ['admin', 'receptionist'].includes(user?.role);
  const canView = ['admin', 'receptionist', 'vet'].includes(user?.role);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des propriétaires</h2>
        {canManage && (
          <Link to="/owners/new" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            ➕ Ajouter un propriétaire
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2">Prénom</th>
              <th className="p-2">Nom</th>
              <th className="p-2">Téléphone</th>
              <th className="p-2">Adresse</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map(owner => (
              <tr key={owner.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{owner.first_name}</td>
                <td className="p-2">{owner.last_name}</td>
                <td className="p-2">{owner.phone}</td>
                <td className="p-2">{owner.address}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <Link to={`/owners/${owner.id}`} className="text-teal-600 underline">
                    Détails
                  </Link>
                  {canManage && (
                    <>
                      <Link to={`/owners/edit/${owner.id}`} className="text-blue-600 underline">
                        Modifier
                      </Link>
                      <Link to={`/owners/delete/${owner.id}`} className="text-red-600 underline">
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

export default OwnerList;
