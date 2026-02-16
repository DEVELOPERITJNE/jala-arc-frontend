import { createStore } from 'vuex'
import 'vue-cookies'
import auth from './auth'
import user from './user';
import dashboard from './dashboard'
import datatop from './datatop'


const store = createStore({
    modules: { 
        auth: auth,
        user: user,
        dashboard: dashboard,
        datatop: datatop,
    },
    state: {
        GALLERY_ITEMS: [],
    },
     mutations: {

    },
});

export default store