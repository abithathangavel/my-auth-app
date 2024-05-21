<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Add any styles you need here */
</style>

  
  
  
  
  <!-- <template>
    <div>
      <div v-if="showSignUp">
        <SignUpForm  @goToLogin="toggleForm" @toggleForm="toggleForm"  />
      </div>
      <div v-else>
        <LoginForm @toggleForm="toggleForm" @loginSuccess="loginSuccess" />
      </div>
    </div>
  </template>

  <script>
  import SignUpForm from './components/SignUpForm.vue';
  import LoginForm from './components/LoginForm.vue';

  export default {
    data() {
      return {
        showSignUp: true
      };
    },
    methods: {
      toggleForm() {
        this.showSignUp = !this.showSignUp;
      },
      
      loginSuccess() {
        if (this.$route.path !== '/home') {
          this.$router.push('/home');
        }
      }

          },
          components: {
            SignUpForm,
            LoginForm
          }
        };
  </script> -->
