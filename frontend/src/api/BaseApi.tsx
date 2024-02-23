import axios from "axios";
import { getItem } from "@/Utils/Storage";
import { BACKEND_API_URL } from "@/Utils/constants.tsx";

const api = axios.create({
    baseURL: BACKEND_API_URL,

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