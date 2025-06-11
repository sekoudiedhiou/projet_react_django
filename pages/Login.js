import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate('/');
    } catch (err) {
      // ✅ Affiche l’erreur précise dans la console
      console.error("Erreur de connexion :", err.response?.data || err.message);
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-teal-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center text-teal-700">Connexion</h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={credentials.username}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-5 px-3 py-2 border rounded"
        />
        <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
