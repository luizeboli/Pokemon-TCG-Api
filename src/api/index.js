import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v1',
  timeout: 5000,
});

export default api;
