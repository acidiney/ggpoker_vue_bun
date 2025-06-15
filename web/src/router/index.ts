import { createRouter, createWebHistory } from 'vue-router'
import AffiliateManagement from '@/views/AffiliateManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'affiliate',
      component: AffiliateManagement,
    },
  ],
})

export default router
