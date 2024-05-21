<template>
  <div>
    <h2>Login</h2>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="navigateToSignUp">Sign Up</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });
        alert(response.data.message);
        this.$router.push('/home');
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    navigateToSignUp() {
      this.$router.push('/signup');
    }
  }
};
</script>
