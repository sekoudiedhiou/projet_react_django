import api from './api';

const login = async (username, password) => {
  const response = await api.post('auth/login/', { username, password });
  const { access, refresh, username: user, role } = response.data;
  localStorage.setItem('token', access); // ✅ Harmonisé avec api.js
  localStorage.setItem('refresh', refresh);
  localStorage.setItem('user', JSON.stringify({ username: user, role }));
  return { access, refresh, user, role };
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
