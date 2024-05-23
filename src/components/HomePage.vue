<template>
  <div class="common">
   
    <div class="home-content">
      <h1>Welcome, {{ user.name }}</h1>
    </div>
  </div>
</template>

<script>
// import NavBar from './NavBar.vue';

export default {
  components: {
    // NavBar
  },
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

.home-content {
  margin-top: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
