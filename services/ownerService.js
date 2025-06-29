import api from './api';

const getAll = () => api.get('owners/');
const getById = (id) => api.get(`owners/${id}/`);
const create = (data) => api.post('owners/', data);
const update = (id, data) => api.put(`owners/${id}/`, data);
const remove = (id) => api.delete(`owners/${id}/`);

const ownerService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default ownerService;
