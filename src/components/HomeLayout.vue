<template>
    <div class="home-layout">
      <NavBar />
      <router-view />
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    components: {
      NavBar
    }
  };
  </script>
  
  <style>
  .home-layout {
    display: flex;
    flex-direction: column;
  }
  </style>
  