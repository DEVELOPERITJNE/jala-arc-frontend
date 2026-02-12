import axios from 'axios';

const isDev = import.meta.env.VITE_APP_NODE_ENV === "LOCAL";
const $axInstance = axios.create({
    withCredentials: true,
    headers:{
        'X-Client-Id': import.meta.env.VITE_APP_CLIENT_ID,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// // files-api-v2
// const $axPdf = axios.create({
//     baseURL : `${import.meta.env.VITE_APP_API_URL}/articles/files`,
//     responseType: 'blob',
// })

// const $axios = axios.create({
//     baseURL: isDev
//     ? '/api/'
//     : `${import.meta.env.VITE_APP_API_URL}/master`,
//     headers: {
//         'X-Client': import.meta.env.VITE_APP_CLIENT_ID,
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest'
//     }
// });

// const $axAcrticle = axios.create({
//     baseURL: isDev ?
//     '/api/'
//     : `${import.meta.env.VITE_APP_API_URL}/`,
//     headers: {
//         'X-Client': import.meta.env.VITE_APP_CLIENT_ID,
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//     }
// });

let akses = undefined;
let curdapi2 = undefined;


// function setupInterceptor(instance) {
//     instance.interceptors.request.use(
//         async function (config) {
//             config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`;
//             return config;
//         },
//         function (error) {
//             return Promise.reject(error);
//         }
//     );
// }

// setupInterceptor($axAcrticle);
// setupInterceptor($axInstance);
// setupInterceptor($axPdf);
// setupInterceptor($axios);


// $axInstance.interceptors.request.use (
   
//     function (config) {
//         config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`; 
//         return config;
//     },
//     async function (error) {
//         NProgress.done();
//         const originalRequest = error.config;
//         if(error.code != "ERR_NETWORK" && error.response){
//             const errMessage = {status:error.response.status}
//             if (error.response.status === 401 && !originalRequest._retry) {
//                 try {
//                     if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
//                     const vResult = await curdapi2.getRefreshToken(akses)
//                     const {access_token,expires_in,refresh_token,token_type} = vResult;
//                     akses = {access_token,expires_in,refresh_token,token_type};
//                     $axInstance.defaults.headers['Authorization'] = `${token_type} ${access_token}`;
//                     originalRequest._retry = true;
//                     return $axInstance(originalRequest);
//                 } catch (error) {
//                     errMessage.message ='unauthentication'
//                 }
//             }else{
//                 switch (error.response.status) {
//                     case 403:
//                         errMessage.message ='not found' 
//                         break;
//                     case 500:
//                         errMessage.message ='internal server error';
//                         break;
//                     default:
//                         errMessage.message=error.response?.data;
//                         break;
//                 }
//             }
//             throw errMessage
//         }
//         return Promise.reject(error);
//     }
// );

// export const axDT = async (url,data,callback,settings,method='post')=>{
//     if (akses?.access_token) {
//         let resp = await $axInstance({
//             method:method,
//             url:url,
//             data
//         });
//         callback({draw: data?.draw,recordsTotal: resp?.data?.recordsTotal,recordsFiltered: resp?.data?.recordsFiltered,data: resp?.data?.data});
//     }
// }

// export { $axios, $axInstance, $axAcrticle, $axPdf};
export {$axInstance};