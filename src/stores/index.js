import { createStore } from 'vuex'
import 'vue-cookies'
import auth from './auth'
import user from './user';
import dashboard from './dashboard'


const store = createStore({
    modules: { 
        auth: auth,
        user: user,
        dashboard: dashboard,
    },
    state: {
        GALLERY_ITEMS: [],
    },
     mutations: {

    },
});

export default store