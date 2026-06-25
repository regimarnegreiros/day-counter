import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
