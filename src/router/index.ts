import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/HomeView.vue'
import customerRoutes from "@/modules/customer/route.ts"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...customerRoutes
  ],
})

export default router
