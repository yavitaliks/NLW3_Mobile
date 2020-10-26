import axios from 'axios'

const api = axios.create({
    baseURL: "http://200.200.200.252:3333"
});

export default api;