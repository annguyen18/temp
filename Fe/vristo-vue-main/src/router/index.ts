import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';
import { localStorageHelper } from '@/utils/helper';
import { LOCAL_STORAGE_AUTH } from '@/utils/constants';

const routes: RouteRecordRaw[] = [
    // dashboard
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
        name: 'login',
        meta: { layout: 'auth' },
    },
    {
        path: '/attendances',
        component: () => import('../views/attendances.vue'),
        name: 'attendances',
        props: true,
    },

    // authentication
    {
        path: '/auth/boxed-signin',
        name: 'boxed-signin',
        component: () => import(/* webpackChunkName: "auth-boxed-signin" */ '../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth' },
    }

];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!localStorageHelper.get(LOCAL_STORAGE_AUTH)) {
            next({ name: 'boxed-signin' })
        }
        next(true);
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
