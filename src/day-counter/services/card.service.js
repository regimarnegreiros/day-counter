import { api } from './api';

export const cardService = {
  async getCards() {
    try {
      const response = await api.get('/api/user/cards');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async getCardById(id) {
    try {
      const response = await api.get(`/api/user/card/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async createCard(data) {
    try {
      const response = await api.post('/api/user/card', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async updateCard(data) {
    try {
      const response = await api.put('/api/user/card/', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async deleteCard(id) {
    try {
      const response = await api.delete(`/api/user/card/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
