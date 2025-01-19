import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
})

fetch(`${import.meta.env.VITE_API_URL}/users`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));

export default api