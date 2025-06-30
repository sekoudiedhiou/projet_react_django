import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ownerService from '../../services/ownerService';

const OwnerDetail = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    ownerService.getById(id)
      .then(res => setOwner(res.data))
      .catch(() => setOwner(null));
  }, [id]);

  if (!owner) return <p className="p-4">Chargement ou erreur de chargement...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Détails du propriétaire</h2>
      <ul className="space-y-2">
        <li><strong>Prénom :</strong> {owner.first_name}</li>
        <li><strong>Nom :</strong> {owner.last_name}</li>
        <li><strong>Téléphone :</strong> {owner.phone}</li>
        <li><strong>Adresse :</strong> {owner.address}</li>
      </ul>
    </div>
  );
};

export default OwnerDetail;
