import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ownerService from '../services/ownerService';

const OwnerDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteOwner = async () => {
      await ownerService.remove(id);
      navigate('/owners');
    };
    deleteOwner();
  }, [id, navigate]);

  return <p className="p-6">Suppression en cours...</p>;
};

export default OwnerDelete;
