import {$axInstance} from '../stores/api.js';
import { DASHBOARD_DATA } from './actions/reqApi';

const state = {
    DASHBOARD_DATA:{},
}

const getters = { 
    [DASHBOARD_DATA] : state => state.DASHBOARD_DATA,
}

const actions = { 
    [DASHBOARD_DATA]:async ({commit})=>{
        return new Promise((resolve,reject)=>{
            $axInstance.get('app/data/dashboard.json').then(resp => {
                commit(DASHBOARD_DATA,resp);
                resolve(resp);
            }).catch(err => {
                commit(DASHBOARD_DATA,{});
                reject(err.response);
            });
        });
    },
}

const mutations = { 
    [DASHBOARD_DATA](state, resp) {
        state.DASHBOARD_DATA = resp;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};