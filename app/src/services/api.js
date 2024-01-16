import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.8:8000', //Conexão local com web server
});

export default api;