import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/dashboard/Login'),
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      meta: { requiresAuthenticate: true },
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages

        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        // Parent routes =>
        {
          name: 'Parent',
          path: '/parents',
          component: () => import('@/views/dashboard/components/Parent/Parents'),
        },
        {
          name: 'Register Parent',
          path: '/parents/register',
          component: () => import('@/views/dashboard/components/Parent/RegisterParent'),
        },
        // End Parent routes <==

        // Student routes =>
        {
          name: 'Student',
          path: '/students',
          component: () => import('@/views/dashboard/components/Student/Students'),
        },
        {
          name: 'Register Student',
          path: '/students/register',
          component: () => import('@/views/dashboard/components/Student/RegisterStudent'),
        },
        // End Parent routes <==
        
        // Teacher routes =>
        {
          name: 'Teacher',
          path: '/teachers',
          component: () => import('@/views/dashboard/components/Teacher/Teachers'),
        },
        {
          name: 'Register Teacher',
          path: '/teachers/register',
          component: () => import('@/views/dashboard/components/Teacher/RegisterTeacher'),
        },
        // End Teacher routes <==
      ],
    },
  ],
})
