import Vue from 'vue';
import Router from 'vue-router';
import SignUpForm from '../components/SignUpForm.vue';
import LoginForm from '../components/LoginForm.vue';
import HomePage from '../components/HomePage.vue';

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
      name: 'HomePage',
      component: HomePage,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } 
  //  else if (to.path === '/login' && loggedIn) {
  //   next('/home');
  //  }
  else {
    next();
  }
});

export default router;
