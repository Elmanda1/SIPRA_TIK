import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true // Important for cookies
});

export const login = async (username, password, role) => {
  try {
    const response = await authApi.post('/login', { username, password, role });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login gagal');
  }
};

export const logout = async () => {
  try {
    await authApi.post('/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await authApi.post('/refresh-token');
    return response.data;
  } catch (error) {
    throw new Error('Session expired');
  }
};