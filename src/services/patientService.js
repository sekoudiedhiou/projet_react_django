import api from './api';

const getAll = () => api.get('patients/');
const getById = (id) => api.get(`patients/${id}/`);
const create = (patient) => api.post('patients/', patient);
const update = (id, patient) => api.put(`patients/${id}/`, patient);
const remove = (id) => api.delete(`patients/${id}/`);

export default {
  getAll,
  getById,
  create,
  update,
  remove
};
