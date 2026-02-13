import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home_view.vue'
import Confirmation from '../views/Confirmation_view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'home',
      component: Home
    },
    {
      path:'/trip/:id',
      name: 'confirmation',
      component: Confirmation
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si l'utilisateur utilise le bouton "retour" du navigateur, garde sa position
    if (savedPosition) {
      return savedPosition
    }
    // Sinon, scroll tout en haut
    return { top: 0, behavior: 'smooth' }
  }
})



export default router
