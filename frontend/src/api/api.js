import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE + '/api'
});

export function setToken(token){
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default API;
