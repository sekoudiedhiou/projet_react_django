import axios from 'axios';

const useFetch = () => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export default useFetch;
