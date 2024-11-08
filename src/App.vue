<template>
  <div id="app">
    <!-- Header Section -->
    <header class="header">
      <MyHeader />
    </header>

    <!-- Main Content Section -->
    <main class="main-content">
      <MyComputer />
    </main>

    <!-- Optional Footer Section -->
    <footer class="footer">
      <p>&copy; 2024 Avi Sharma</p>
    </footer>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';
import MyComputer from './components/MyComputer.vue';

export default {
  name: 'App',
  components: {
    MyHeader,
    MyComputer
  }
};
</script>

<style>
/* General page styling */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
}

.footer {
  padding: 10px;
  text-align: center;
  background-color: #333;
  color: white;
}
</style>
