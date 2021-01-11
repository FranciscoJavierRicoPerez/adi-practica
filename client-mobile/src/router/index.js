import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import ListadoVideojuegos from '../views/ListadoVideojuegos.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/videojuegos',
    name: 'Videojuegos',
    component: ListadoVideojuegos
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
