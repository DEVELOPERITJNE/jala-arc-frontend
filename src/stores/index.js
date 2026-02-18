import { createStore } from 'vuex'
import 'vue-cookies'
import auth from './auth'
import user from './user';
import dashboard from './dashboard'
import datatop from './datatop'
import financepanel from './financepanel'


const store = createStore({
    modules: { 
        auth: auth,
        user: user,
        dashboard: dashboard,
        datatop: datatop,
        financepanel: financepanel,
    },
    state: {
        GALLERY_ITEMS: [],
    },
     mutations: {

    },
});

export default store