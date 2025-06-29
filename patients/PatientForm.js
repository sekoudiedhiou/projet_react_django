import React, { useState, useEffect } from 'react';
import patientService from '../../services/patientService';
import ownerService from '../../services/ownerService';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
  name: '', type: 'chat', race: '', date_of_birth: '', weight: '', sex: 'M', owner: ''
};

const PatientForm = () => {
  const [patient, setPatient] = useState(initialState);
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    ownerService.getAll().then(res => setOwners(res.data));
    if (id) {
      patientService.getById(id).then(res => setPatient(res.data));
    }
  }, [id]);

  const handleChange = e => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await patientService.update(id, patient);
      } else {
        await patientService.create(patient);
      }
      navigate('/patients');
    } catch {
      setError("Erreur d'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{id ? 'Modifier' : 'Ajouter'} un patient</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input name="name" value={patient.name} onChange={handleChange} className="input mb-2" placeholder="Nom" />
      <select name="type" value={patient.type} onChange={handleChange} className="input mb-2">
        <option value="chat">Chat</option>
        <option value="chien">Chien</option>
        <option value="lapin">Lapin</option>
      </select>
      <input name="race" value={patient.race} onChange={handleChange} className="input mb-2" placeholder="Race" />
      <input type="date" name="date_of_birth" value={patient.date_of_birth} onChange={handleChange} className="input mb-2" />
      <input type="number" step="0.1" name="weight" value={patient.weight} onChange={handleChange} className="input mb-2" placeholder="Poids (kg)" />
      <select name="sex" value={patient.sex} onChange={handleChange} className="input mb-2">
        <option value="M">Mâle</option>
        <option value="F">Femelle</option>
      </select>
      <select name="owner" value={patient.owner} onChange={handleChange} className="input mb-4">
        <option value="">Choisir le propriétaire</option>
        {owners.map(o => (
          <option key={o.id} value={o.id}>{o.first_name} {o.last_name}</option>
        ))}
      </select>

      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Enregistrer
      </button>
    </form>
  );
};

export default PatientForm;
