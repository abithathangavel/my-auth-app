<template>
  <div class="home">
    <h1>Welcome, {{ user.name }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

h1 {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #0bb6a5;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #8e8e8e;
  color: white;
  box-shadow: 0 0 10px rgba(93, 92, 92, 0.1);
}
</style>
