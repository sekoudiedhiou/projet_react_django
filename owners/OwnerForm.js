import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ownerService from '../../services/ownerService';

const initialState = {
  first_name: '',
  last_name: '',
  phone: '',
  address: '',
  email: ''
};

const OwnerForm = () => {
  const [owner, setOwner] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      ownerService.getById(id)
        .then(res => setOwner(res.data))
        .catch(() => setError("Erreur lors du chargement."));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!owner.first_name || !owner.last_name || !owner.phone || !owner.address || !owner.email) {
      setError("Tous les champs sont requis.");
      return;
    }

    try {
      if (id) {
        await ownerService.update(id, owner);
      } else {
        await ownerService.create(owner);
      }
      navigate('/owners');
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.data?.email?.[0]) {
        setError("Cette adresse e-mail est déjà utilisée.");
      } else {
        setError("Champs invalides ou erreur d'enregistrement.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Modifier' : 'Ajouter'} un propriétaire</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        name="first_name"
        value={owner.first_name}
        onChange={handleChange}
        placeholder="Prénom"
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        name="last_name"
        value={owner.last_name}
        onChange={handleChange}
        placeholder="Nom"
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={owner.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        name="phone"
        value={owner.phone}
        onChange={handleChange}
        placeholder="Téléphone"
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        name="address"
        value={owner.address}
        onChange={handleChange}
        placeholder="Adresse"
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />

      <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
        Enregistrer
      </button>
    </form>
  );
};

export default OwnerForm;
