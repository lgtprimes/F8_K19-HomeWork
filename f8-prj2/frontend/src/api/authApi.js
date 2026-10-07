import axiosClient from './axiosClient';

export const authApi = {
    register: async (payload) => {
        try {
            const response = await axiosClient.post('/auth/register', payload);
            return response;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    login: (credentials) => {
        return axiosClient.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
        });
    },
    logout: () => axiosClient.post('/auth/logout'),
};