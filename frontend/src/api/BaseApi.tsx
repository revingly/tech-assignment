import axios from "axios";
import { getItem } from "@/Utils/Storage";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',

});

// Add jwt token to every request
api.interceptors.request.use(
    (config) => {
        const token = getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api