import axios from 'axios';

// Configura a baseURL para axios usando a variável de ambiente
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
});

// Função para buscar usuários utilizando axios
export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data; // Retorna os dados dos usuários
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

export default api;