import {$axInstance} from '../stores/api.js';
import { TOP_TEN } from './actions/reqApi';

const state = {
    TOP_TEN:{},
}

const getters = { 
    [TOP_TEN] : state => state.TOP_TEN,
}

const actions = { 
    [TOP_TEN]:async ({commit})=>{
        return new Promise((resolve,reject)=>{
            $axInstance.get('app/data/toptenreport.json').then(resp => {
                commit(TOP_TEN,resp);
                resolve(resp);
            }).catch(err => {
                commit(TOP_TEN,{});
                reject(err.response);
            });
        });
    },
}

const mutations = { 
    [TOP_TEN](state, resp) {
        state.TOP_TEN = resp;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};