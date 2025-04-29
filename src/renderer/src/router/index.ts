import { createMemoryHistory, createRouter } from 'vue-router'

import MainLayout from '@renderer/layouts/MainLayout.vue'
import HomePage from '@renderer/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'home',
        component: HomePage
      }
    ]
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
