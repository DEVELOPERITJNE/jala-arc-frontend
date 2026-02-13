import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/BaseHomeView.vue';
import BaseIndex from '../views/BaseIndex.vue';
import BaseAgenPanel from '../views/BaseAgenPanel.vue';
import BaseFinanceDashboard from '../views/BaseFinanceDashboard.vue';
import BaseTopTenView from '../views/BaseTopTenView.vue'
import BaseDataManagementView from '../views/BaseDataManagementView.vue';
import BaseValidationView from '../views/BaseValidationView.vue';


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
                path: 'FinanceDashboard',
                name: 'FinanceDashboard.view',
                component: BaseFinanceDashboard,
                meta: { 
                    title: 'Finance Dashboard',
                    breadcrumb: 'Finance Dashboard'
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
            {
                path: 'topten',
                name: 'topten.view',
                component: BaseTopTenView,
                meta: { 
                    title: 'Top 10',
                    breadcrumb: 'Top 10'
                },
            },
            {
                path: 'datamanagement',
                name: 'datamanagement.view',
                component: BaseDataManagementView,
                meta: { 
                    title: 'Data Management',
                    breadcrumb: 'Data Management'
                },
            },
            {
                path: 'validation',
                name: 'validation.view',
                component: BaseValidationView,
                meta: { 
                    title: 'Data Validation',
                    breadcrumb: 'Data Validation'
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