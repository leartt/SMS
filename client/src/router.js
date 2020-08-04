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
      meta: { requiresGuest: true }
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
          component: () => import('@/views/dashboard/components/UserProfile/UserProfile'),
        },

        // Admin routes =>
        {
          name: 'Admin',
          path: 'admins',
          component: () => import('@/views/dashboard/components/Admin/Admins'),
          meta: { requiresAdmin: true }
        },

        {
          name: 'Register Admin',
          path: 'admins/register',
          component: () => import('@/views/dashboard/components/Admin/RegisterAdmin'),
          meta: { requiresAdmin: true }
        },

        // End admin routes <==


        // Parent routes =>
        {
          name: 'Parent',
          path: 'parents',
          component: () => import('@/views/dashboard/components/Parent/Parents'),
        },

        {
          name: 'Register Parent',
          path: 'parents/register',
          component: () => import('@/views/dashboard/components/Parent/RegisterParent'),
          meta: { requiresAdmin: true }
        },
        // End Parent routes <==

        // Student routes =>
        {
          name: 'Student',
          path: 'students',
          component: () => import('@/views/dashboard/components/Student/Students'),
        },

        {
          name: 'Register Student',
          path: 'students/register',
          component: () => import('@/views/dashboard/components/Student/RegisterStudent'),
          meta: { requiresAdmin: true }
        },
        // End Parent routes <==

        // Teacher routes =>
        {
          name: 'Teacher',
          path: 'teachers',
          component: () => import('@/views/dashboard/components/Teacher/Teachers'),
        },

        {
          name: 'Register Teacher',
          path: 'teachers/register',
          component: () => import('@/views/dashboard/components/Teacher/RegisterTeacher'),
          meta: { requiresAdmin: true }
        },
        // End Teacher routes <==

        // Classroom routes =>
        {
          name: 'Classroom',
          path: 'classrooms',
          component: () => import('@/views/dashboard/components/Classroom/Classrooms'),
        },
        {
          name: 'Register Classroom',
          path: 'classrooms/create',
          component: () => import('@/views/dashboard/components/Classroom/CreateClassroom'),
          meta: { requiresAdmin: true }
        },
        // End Classroom routes <==

        // Feedback routes =>
        {
          name: 'Feedback',
          path: 'feedbacks',
          component: () => import('@/views/dashboard/components/Feedback/Feedbacks'),
        },
        {
          name: 'Create Feedback',
          path: 'feedbacks/create',
          component: () => import('@/views/dashboard/components/Feedback/CreateFeedback'),
          meta: { requiresParent: true }
        },
        // End Feedback routes <==

        // Course routes => 
        {
          name: 'Courses',
          path: 'courses',
          component: () => import('@/views/dashboard/components/Course/Course')
        },
        {
          name: 'Add Course',
          path: 'courses/create',
          component: () => import('@/views/dashboard/components/Course/AddCourse'),
          meta: { requiresAdmin: true }
        },
        // End Course routes <==

        // Exam routes =>
        {
          name: 'Exams',
          path: 'exams',
          component: () => import('@/views/dashboard/components/Exam/Exam'),
        },
        {
          name: 'Register Exam',
          path: 'exams/register',
          component: () => import('@/views/dashboard/components/Exam/RegisterExam'),
          meta: { requiresAdminOrTeacher: true }
        },
        {
          name: 'Exam Results',
          path: 'exams/result',
          component: () => import('@/views/dashboard/components/Exam/Results'),
        },
        

        // End Exam routes <==
        
        // Grade routes
        {
          name: 'Add Grade',
          path: 'grades/register',
          component: () => import('@/views/dashboard/components/Grade/RegisterGrade'),
          meta: { requiresAdminOrTeacher: true }
        },
        {
          name: 'Grade',
          path: 'grades',
          component: () => import('@/views/dashboard/components/Grade/Grades'),
          meta: { requiresStudent: true }
        },

        // End Grade routes <==

        {
          name: 'Reports',
          path: 'reports',
          component: () => import('@/views/dashboard/components/Report/Reports'),
          meta: { requiresAdmin: true }
        },

      ],
    },
  ],
})
