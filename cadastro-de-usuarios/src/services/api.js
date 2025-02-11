import axios from 'axios';

// Configura a baseURL para axios usando a variável de ambiente
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
});

// Interceptor para adicionar o token de autenticação a todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data; // Retorna o token e o userId
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

// Função para registrar um novo usuário
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/users', userData); // Certifique-se de que o caminho está correto
        return response.data; // Retorna os dados do usuário registrado
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

// Função para atualizar um usuário
export const updateUser = async (userId, userData) => {
    try {
        const response = await api.patch(`/api/users/${userId}`, userData);
        return response.data; // Retorna os dados do usuário atualizado
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

// Função para excluir um usuário
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/api/users/${userId}`);
        return response.data; // Retorna os dados do usuário excluído
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

export default api;
