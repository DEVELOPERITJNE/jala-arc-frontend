import axios from 'axios';

const isDev = import.meta.env.VITE_APP_NODE_ENV === "LOCAL";
const $axInstance = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Client-ID' : import.meta.env.VITE_APP_CLIENT_ID
    }
});

$axInstance.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
);

$axInstance.interceptors.response.use(
    function (response) {
        // nprogressCustomDone()
        return response;
    },
    async function (error) {
        // nprogressCustomDone()
        const originalRequest = error.config;
        if (error.code != "ERR_NETWORK" && error.response) {
            const errMessage = { status: error.response.status }

            switch (error.response.status) {
                case 403:
                    errMessage.message = 'not found'
                    break;
                case 500:
                    errMessage.message = 'internal server error';
                    break;
                default:
                    errMessage.message = error.response?.data;
                    break;
            }
            throw errMessage
        }
        return Promise.reject(error);
    }
);


export {$axInstance};