import {$axInstance} from '../stores/api.js';
import { DT_MANAGEMENT, VALIDATION_RECON_GETLIST } from './actions/reqApi';

const state = {
    DT_MANAGEMENT:{},
    VALIDATION_RECON_GETLIST:{},
}

const getters = { 
    [DT_MANAGEMENT] : state => state.DT_MANAGEMENT,
    [VALIDATION_RECON_GETLIST] : state => state.VALIDATION_RECON_GETLIST,
}

const actions = { 
    [DT_MANAGEMENT]:async ({commit})=>{
        return new Promise((resolve,reject)=>{
            $axInstance.get('app/data/datamanagement.json').then(resp => {
                commit(DT_MANAGEMENT,resp);
                resolve(resp);
            }).catch(err => {
                commit(DT_MANAGEMENT,{});
                reject(err.response);
            });
        });
    },
    [VALIDATION_RECON_GETLIST]:async ({commit})=>{
        return new Promise((resolve,reject)=>{
            $axInstance.get('app/data/validation-recon-data.json').then(resp => {
                commit(VALIDATION_RECON_GETLIST,resp);
                resolve(resp);
            }).catch(err => {
                commit(VALIDATION_RECON_GETLIST,{});
                reject(err.response);
            });
        });
    },
}

const mutations = { 
    [DT_MANAGEMENT](state, resp) {
        state.DT_MANAGEMENT = resp;
    },
    [VALIDATION_RECON_GETLIST](state, resp) {
        state.VALIDATION_RECON_GETLIST = resp;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};