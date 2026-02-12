import { createStore } from 'vuex'
import 'vue-cookies'
import auth from './auth'
import user from './user';


const store = createStore({
    modules: { 
        auth: auth,
        user: user,
    },
    state: {
        GALLERY_ITEMS: [],
    },
     mutations: {

    },
});

export default store