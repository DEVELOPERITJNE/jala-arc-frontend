import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/BaseHomeView.vue';
import BaseIndex from '../views/BaseIndex.vue';
import BaseAgenPanel from '../views/BaseAgenPanel.vue';

const routes = [
    {
        path: '/app',
        redirect: {name: 'Home.view'},
        component: BaseIndex,
        children: [
            {
                path: 'home',
                name: 'Home.view',
                component: HomeView,
                meta: { 
                    title: 'Home',
                    breadcrumb: 'Home'
                },
            },
            {
                path: 'agenpanel',
                name: 'agenpanel.view',
                component: BaseAgenPanel,
                meta: { 
                    title: 'Agen Panel',
                    breadcrumb: 'Agen Panel'
                },
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const defTitle = 'ARC';
    document.title = `${defTitle} | ${to.meta.title}` || defTitle;
    next()
})

export default router;