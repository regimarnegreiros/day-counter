import { api } from './api';

export const userService = {
    async getCurrentUser() {
        const response = await api.get('/api/user/');
        return response.data.user;
    },
    async updateName(name) {
        try {
            const user = await this.getCurrentUser();
            const response = await api.put(`/api/user/${user.userID}`, {
                name: name,
                email: user.email,
                notification: user.notification
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    async updateEmail(email) {
        try {
            const user = await this.getCurrentUser();
            const response = await api.put(`/api/user/${user.userID}`, {
                name: user.name,
                email: email,
                notification: user.notification
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    async updatePassword(currentPassword, newPassword) {
        try {
            const response = await api.patch('/api/user/', {
                password: currentPassword,
                new_password: newPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};