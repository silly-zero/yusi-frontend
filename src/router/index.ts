import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue')
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import('@/pages/Diary.vue')
  },
  {
    path: '/room',
    name: 'RoomList',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/room/:code',
    name: 'Room',
    component: () => import('@/pages/Room.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
