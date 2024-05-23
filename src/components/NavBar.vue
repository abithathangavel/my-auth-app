<template>
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/home">Hello, {{ user.name }} !</router-link>
        <div class="navbar-left">
          <router-link to="/home">Home</router-link>
          <router-link to="/notes">Notes</router-link>
          <router-link to="/todo">My Todo</router-link>
          <router-link to="/expense-tracker">Expense Tracker</router-link>
          <router-link to="/timer">Timer</router-link>
          <router-link to="/file-keeper">File Keeper</router-link>
        </div>
        <div class="navbar-right">
          <button class="button-logout" @click="logout">Sign out</button>
        </div>
      </div>
    </nav>
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
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #0bb6a5;
    color: white;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
.navbar-container a{
    color: white;
    text-decoration: none;
}
.navbar-left {
    flex: 1;
    text-align: center;
}

.navbar-left a {
    margin-right: 10px;
    color: white;
    text-decoration: none;
    padding: 50px;

}

.navbar-left a:hover {
    background-color: #0b0000;
    color: white;
}

.navbar-right {
    display: flex;
    align-items: center;
  }
  
  .button-logout {
    background-color: #0b0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 20px;
}

.button-logout:hover {
    background-color: #f0f0f0;
    color: #333;
  }
  </style>
  