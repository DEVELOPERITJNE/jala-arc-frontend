import {$axInstance} from './api.js';
import { AUTH_PROFILE } from './actions/reqApi.js';
const APP_JWT_SECRET = import.meta.env.VITE_APP_JWT_SECRET;
import 'url-search-params-polyfill';

const state = {
    AUTH_PROFILE:{},
};

const getters = {
    [AUTH_PROFILE] : state => state.AUTH_PROFILE,
};

const mutations = { 
    [AUTH_PROFILE](state, resp){
        state.AUTH_PROFILE = resp;
    },
}


const actions = {
    [AUTH_PROFILE]({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            $axInstance.get(`${import.meta.env.VITE_APP_OAUTH_URL}/myprofile`).then(async(response) => {
                resolve(response?.data)
                commit(AUTH_PROFILE,response?.data)
            }).catch(async (error) => {
                console.error('error', error)
                if(error?.response?.status==401){
                    await dispatch('logout');
                }
                reject(error?.response?.data)
            });
        })
    },

    // [AUTH_LOGOUT]: ({commit,state,getters,dispatch}) => {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //         // await $cookies.remove('dapi');
    //         // commit(AUTH_STATUS,false);
    //         // commit(AUTH_TOKEN,{});
    //         // commit(AUTH_USER,{});
    //         // resolve();
    //         const curdapi2 = await new dapi2();
    //         if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
    //         await curdapi2.authLogout()
    //         window.location.href = `${import.meta.env.VITE_APP_OAUTH_URL}/login`;
    //     } catch (error) {
    //       reject(error);
    //     }
    //   })
    // },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};