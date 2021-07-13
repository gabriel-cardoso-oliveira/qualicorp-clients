import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qualicorp-server.herokuapp.com',
});

export default api;
