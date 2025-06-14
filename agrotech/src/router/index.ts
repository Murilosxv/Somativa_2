// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/manutencao',
      name: 'manutencao',
      component: () => import('../views/MaintenanceView.vue')
    }
  ]
})

export default router