import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LostPage from '../views/LostPage.vue'
import CodePage from '../views/CodePage.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainPage,
        },
        {
            path: '/lost',
            name: "lost",
            component: LostPage,
        },
        {
            path: '/code/:code',
            name: 'code',
            component: CodePage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not found',
            component: NotFound,
        }
    ]
})

export default router