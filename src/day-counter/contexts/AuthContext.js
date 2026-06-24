import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem('@user_data');
      const storedToken = await AsyncStorage.getItem('@auth_token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const updateUserData = async (newUserData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...newUserData };
      AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = await authService.register(name, email, password, confirmPassword);
    setUser(data.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
