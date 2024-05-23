<template>
  <div class="form">
    <div class="login-cont">
    <h2>Sign Up</h2>
    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button class="button" @click="signUp">Sign Up</button>
    <div class="middle-or">Already have an account !</div>
    <button class="button" @click="navigateToLogin">Signin</button>
    </div>
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
        localStorage.setItem('user', JSON.stringify(response.data.user));
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



<style>
body{
  margin: 0;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-cont {
  width: 30%;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(29, 30, 30, 0.1);
  border-radius: 5px;
}

.middle-or{
  display: flex;
  justify-content: center;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-color: #e4f3f2;
}

.button {
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border: none;
  background-color: #0bb6a5;
  color: white;
  border-radius: 4px;
}

.button:hover{
  background-color: #040009;
  color: white;
  border: none;
  box-shadow: 0 0 10px rgba(93, 92, 92, 0.1);
}

.button:last-of-type {
  margin-top: 5px;
}
</style>
