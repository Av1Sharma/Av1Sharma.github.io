<template>
  <div class="computer-container">
    <div class="computer-screen">
      <div class="screen-content">
        <h2>Welcome!</h2>
        <button @click="toggleProjectOptions">Start</button>

        <!-- Project Options Section -->
        <div v-if="showOptions">
          <button @click="showSchoolProjects">School Projects</button>
          <button @click="showPersonalProjects">Personal Projects</button>
        </div>

        <!-- School Projects Section -->
        <div v-if="showSchoolProjectsSection">
          <h3>School Projects</h3>
          <p>Project 1: <a href="https://github.com/yourusername/project1" target="_blank">GitHub</a></p>
          <p>Project 2: <a href="https://github.com/yourusername/project2" target="_blank">GitHub</a></p>
        </div>

        <!-- Personal Projects Section -->
        <div v-if="showPersonalProjectsSection">
          <h3>Personal Projects</h3>
          <p>Project A: <a href="https://github.com/yourusername/projectA" target="_blank">GitHub</a></p>
          <p>Project B: <a href="https://github.com/yourusername/projectB" target="_blank">GitHub</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComputer',
  data() {
    return {
      showOptions: false,
      showSchoolProjectsSection: false,
      showPersonalProjectsSection: false
    };
  },
  methods: {
    toggleProjectOptions() {
      this.showOptions = !this.showOptions;
    },
    showSchoolProjects() {
      this.showSchoolProjectsSection = true;
      this.showPersonalProjectsSection = false;
    },
    showPersonalProjects() {
      this.showPersonalProjectsSection = true;
      this.showSchoolProjectsSection = false;
    }
  }
};
</script>

<style scoped>
.computer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* Adjust as needed */
}

.computer-screen {
  width: 80%;
  height: 400px;
  border: 10px solid black;
  border-radius: 10px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.screen-content {
  text-align: center;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

h2 {
  margin-bottom: 20px;
}
</style>
