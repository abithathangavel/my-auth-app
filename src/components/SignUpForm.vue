<template>
  <div>
    <h2>Sign Up</h2>
    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signUp">Sign Up</button>
    <button @click="navigateToLogin">Login</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post('http://localhost:3000/signup', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        alert(response.data.message);
        this.$router.push('/login');
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    navigateToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
