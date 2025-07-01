import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deletePatient = async () => {
      await patientService.remove(id);
      navigate('/patients');
    };
    deletePatient();
  }, [id, navigate]);

  return <p className="p-6">Suppression en cours...</p>;
};

export default PatientDelete;
