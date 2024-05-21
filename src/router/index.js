import Vue from 'vue';
import Router from 'vue-router';
import SignUpForm from '../components/SignUpForm.vue';
import LoginForm from '../components/LoginForm.vue';
import HomePage from '../components/HomePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',  // Use 'hash' if you prefer hash mode
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
      component: HomePage
    }
  ]
});
