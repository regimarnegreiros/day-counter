import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 segundos
});

  let logoutCallback = null;
  
  export async function setLogoutCallback(callback){
    logoutCallback = callback;
  };

  export async function executeLogout(){
    if(logoutCallback){
      await logoutCallback()
    }
  }

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
      const method = error.config?.method?.toLowerCase();
      if (['get', 'post', 'put', 'delete'].includes(method)) {
        Alert.alert(
          "Falha de conexão",
          "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
        );
      }
    }
    return Promise.reject(error);
  }
);
