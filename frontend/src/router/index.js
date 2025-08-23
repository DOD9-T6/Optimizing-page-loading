import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'DevExtreme',
        path: '/devextreme',
        component: () => import('@/pages/DevExtremePage.vue')
    },
    {
        name: 'Vue',
        path: '/vue',
        component: () => import('@/pages/VuePage.vue')
    },
    {
        name: 'Quasar',
        path: '/quasar',
        component: () => import('@/pages/QuasarPage.vue')
    },
    {
        path: '/',
        redirect: '/devextreme'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router