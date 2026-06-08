import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import store from '../stores/index.js';

import HomeView from '../views/BaseHomeView.vue';
import BaseIndex from '../views/BaseIndex.vue';
import BaseAgenPanel from '../views/BaseAgenPanel.vue';
import BaseFinanceDashboard from '../views/BaseFinanceDashboard.vue';
import BaseTopTenView from '../views/BaseTopTenView.vue'
import BaseDataManagementView from '../views/BaseDataManagementView.vue';
import BaseValidationView from '../views/BaseValidationView.vue';
import BaseReportView from '../views/BaseReportView.vue';
import BaseError404 from '../components/BaseError404.vue';
import BaseError403 from '../components/BaseError403.vue';
import ErrorLayout from '../views/BaseErrorRoute.vue';
import MainLayout from '../views/MainLayout.vue';


const routes = [
    {
        path: '/403',
        component: ErrorLayout,
        beforeEnter: (to, from, next) => {
            const isForbidden = store.getters['auth/IS_403']
            if (!isForbidden) {
                next({ name: 'Home.view' })  // redirect ke home kalo akses langsung
            } else {
                next()
            }
        },
        children: [
            {
                path: '',
                name: 'forbidden',
                component: BaseError403,
                meta: { title: 'Access Denied' }
            }
        ]
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: BaseIndex,
                redirect: {name: 'Home.view'},
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
                        path: 'report',
                        name: 'report.view',
                        component: BaseReportView,
                        meta: { 
                            title: 'Report',
                            breadcrumb: 'Report'
                        },
                    },
                    {
                        path: 'agenpanel',
                        name: 'agenpanel.view',
                        component: BaseAgenPanel,
                        meta: { 
                            title: 'Agen Panel',
                            breadcrumb: 'Agen Dashboard'
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
                    {
                        path: ':pathMatch(.*)*',
                        name: 'not-found',
                        component: BaseError404,
                        meta:{
                            title: 'Page not found'
                        }
                    }
                ]

            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory('/app'),
    routes,
    scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
    const defTitle = 'ARC';
    document.title = to.meta.title ? `${defTitle} | ${to.meta.title}` : defTitle;
    next()
})

export default router;