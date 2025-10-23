import axios from 'axios';

// Base URL dynamisch aus Environment Variable (VITE_API_BASE)
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE + '/api' });

// Funktion um Token zu setzen
export function setToken(token){
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default API;
