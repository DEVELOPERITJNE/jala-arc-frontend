import axios from 'axios';

const isDev = import.meta.env.VITE_APP_NODE_ENV === "LOCAL";
const $axInstance = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

export {$axInstance};