import axios from 'axios';

const api = axios.create({ baseURL: 'https://admin-hub-api.herokuapp.com/' });

export default api;
