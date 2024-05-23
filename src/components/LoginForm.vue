<template>
  <div class="form">
    <div class="login-cont">
      <h2>Login</h2>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <!-- <select v-model="role" class="user-type-select">
      <option disabled value="">Select User Type</option>
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select> -->
      <button class="button" @click="login">Signin</button>
      <div class="middle-or">New user ?</div>
      <button class="button" @click="navigateToSignUp">Create a new account</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      // role: 'buyer'
    };
  },
 methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
          // role: this.role
        });
        alert(response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.user.role === 'buyer') {
          this.$router.push('/buyer');
        } else {
          this.$router.push('/seller');
        }
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
.user-type-select {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-color: #e4f3f2;
}
</style>
