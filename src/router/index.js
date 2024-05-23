import Vue from 'vue';
import Router from 'vue-router';
import SignUpForm from '../components/SignUpForm.vue';
import LoginForm from '../components/LoginForm.vue';
import HomePage from '../components/HomePage.vue';
import HomeLayout from '../components/HomeLayout.vue';
import NotesPage from '../components/NotesPage.vue'; 
import TodoPage from '../components/TodoPage.vue'; 
import ExpenseTrackerPage from '../components/ExpenseTrackerPage.vue'; 
import TimerPage from '../components/TimerPage.vue'; 
import FileKeeperPage from '../components/FileKeeperPage.vue'; 

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpForm
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/home',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage,
          meta: { requiresAuth: true }
        },
        {
          path: '/notes',
          name: 'NotesPage',
          component: NotesPage,
          meta: { requiresAuth: true }
        },
        {
          path: '/todo',
          name: 'TodoPage',
          component: TodoPage,
          meta: { requiresAuth: true }
        },
        {
          path: '/expense-tracker',
          name: 'ExpenseTrackerPage',
          component: ExpenseTrackerPage,
          meta: { requiresAuth: true }
        },
        {
          path: '/timer',
          name: 'TimerPage',
          component: TimerPage,
          meta: { requiresAuth: true }
        },
        {
          path: '/file-keeper',
          name: 'FileKeeperPage',
          component: FileKeeperPage,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } 
  // else if (to.path === '/login' && loggedIn) {
  //   next('/home');
  // } 
  else {
    next();
  }
});

export default router;
