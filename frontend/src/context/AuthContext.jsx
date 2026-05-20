import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ttm_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ttm_token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    const response = await api.post('/auth/login', credentials);
    const { token: accessToken, user: userData } = response.data;
    localStorage.setItem('ttm_token', accessToken);
    localStorage.setItem('ttm_user', JSON.stringify(userData));
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setUser(userData);
    setToken(accessToken);
    setLoading(false);
    return response.data;
  };

  const signup = async (formData) => {
    setLoading(true);
    const response = await api.post('/auth/signup', formData);
    const { token: accessToken, user: userData } = response.data;
    localStorage.setItem('ttm_token', accessToken);
    localStorage.setItem('ttm_user', JSON.stringify(userData));
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setUser(userData);
    setToken(accessToken);
    setLoading(false);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('ttm_token');
    localStorage.removeItem('ttm_user');
    setUser(null);
    setToken('');
    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
