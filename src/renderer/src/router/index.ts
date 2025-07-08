import { createMemoryHistory, createRouter } from 'vue-router'
import * as routeConstants from '@renderer/constants/route.constants'

import MainLayout from '@renderer/layouts/MainLayout.vue'
import HomePage from '@renderer/pages/HomePage.vue'
import DevicesPage from '@renderer/pages/DevicesPage.vue'
import DevicePage from '@renderer/pages/DevicePage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: routeConstants.HOME,
        component: HomePage
      },
      {
        path: '/devices',
        name: routeConstants.DEVICES,
        component: DevicesPage
      },
      {
        path: '/device',
        name: routeConstants.DEVICE,
        component: DevicePage
      }
    ]
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
