import {$axInstance} from './api.js';
import { AUTH_PROFILE, IS_403 } from './actions/reqApi.js';

const state = {
    AUTH_PROFILE:{},
    IS_403: false

};

const getters = {
    [AUTH_PROFILE] : state => state.AUTH_PROFILE,
    [IS_403] : state => state.IS_403,
};

const mutations = { 
    [AUTH_PROFILE](state, resp){
        state.AUTH_PROFILE = resp;
    },
    [IS_403](state, resp){
        state.IS_403 = resp;
    },
}


const actions = {
    [AUTH_PROFILE]({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            const toAccessId = import.meta.env.VITE_APP_ACCESS_ID;
            const toBranchId = import.meta.env.VITE_APP_BRANCH_ID;
            const toAppId = import.meta.env.VITE_APP_APP_ID;
            const toDeviceId = import.meta.env.VITE_APP_DEVICE_ID;
            $axInstance.get(`${import.meta.env.VITE_APP_OAUTH_API}/myprofile?app_id=${toAppId}&branch_id=${toBranchId}&todevice_id=${toDeviceId}&toaccess_id=${toAccessId}&no_headers=1`).then(async(response) => {
                resolve(response?.data)
                commit(AUTH_PROFILE,response?.data)
            }).catch(async (error) => {
                console.error('error', error)
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