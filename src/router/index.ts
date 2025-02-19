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
      component: () => import('../views/DoctorsView.vue'),
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: () => import('../views/AppointmentsView.vue'),
    },
    {
      // TODO: change :name param to unique identifier ex. :doctorId assuming there's an available API endpoint
      path: '/doctors/:name',
      name: 'book-doctor',
      component: () => import('../views/DoctorDetailsView.vue'),
    },
    {
      path: '/appointment-success',
      name: 'appointment-success',
      props: true,
      component: () => import('../views/AppointmentSuccessView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      props: true,
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
