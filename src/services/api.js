import axios from "axios";

const api = axios.create({
    baseURL: "https://web-production-0f7c0.up.railway.app"
    });

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    export default api;