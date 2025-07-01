import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patientService';
import { formatDate, formatWeight } from '../../utils/formatters';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    patientService.getById(id).then(res => setPatient(res.data));
  }, [id]);

  if (!patient) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Détails du patient</h2>
      <ul className="space-y-2">
        <li><strong>Nom :</strong> {patient.name}</li>
        <li><strong>Type :</strong> {patient.type}</li>
        <li><strong>Race :</strong> {patient.race}</li>
        <li><strong>Sexe :</strong> {patient.sex}</li>
        <li><strong>Poids :</strong> {formatWeight(patient.weight)}</li>
        <li><strong>Date de naissance :</strong> {formatDate(patient.date_of_birth)}</li>
        <li><strong>Propriétaire ID :</strong> {patient.owner}</li>
      </ul>
    </div>
  );
};

export default PatientDetail;
