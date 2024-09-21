import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/UpdateView.vue')
    },
    {
      path: '/create-product',
      name: 'create-product',
      component: () => import('../views/CreateProduct.vue')
    },
    {  
    path: '/update-product/:id',
    name: 'update-product',
    component: () => import('../views/UpdateProduct.vue')
    }
  ]
})

export default router
