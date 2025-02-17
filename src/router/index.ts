import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/doctors',
      name: 'doctors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DoctorsView.vue'),
    },
    {
      // TODO: change :name param to unique identifier ex. :doctorId assuming there's an available API endpoint
      path: '/doctors/:name',
      name: 'book-doctor',
      component: () => import('../views/DoctorDetailsView.vue'),
    },
  ],
})

export default router
