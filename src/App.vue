<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <a href="mailto:your-email@example.com" aria-label="Email">
          📧
        </a>
        <a href="/path-to-resume.pdf" target="_blank" aria-label="Resume">
          📄
        </a>
      </div>
      <h1 class="header-center">Avi Sharma</h1>
      <div class="header-right">
        <div class="icons">
      <a :href="githubUrl" target="_blank" class="icon">
        <i class="fab fa-github"></i>
      </a>
      <a :href="linkedinUrl" target="_blank" class="icon">
        <i class="fab fa-linkedin"></i>
      </a>
        </div>
      </div>
    </header>

    <!-- Navigation Buttons -->
    <nav class="nav-buttons">
      <button @click="scrollToSection('about')">About Me</button>
      <button @click="scrollToSection('work')">View My Work</button>
    </nav>

    <!-- About Me Section -->
    <section id="about" class="section">
      <h2>About Me</h2>
      <p>Brief introduction about yourself...</p>
    </section>

    <!-- My Work Section -->
    <section id="work" class="section">
      <h2>My Work</h2>
      <div class="toggle-switch">
        <label>
          <input type="radio" name="projectType" value="school" v-model="projectType" />
          School Projects
        </label>
        <label>
          <input type="radio" name="projectType" value="personal" v-model="projectType" />
          Personal Projects
        </label>
      </div>

      <div v-if="projectType === 'school'">
        <p>School Projects...</p>
        <!-- Add your school projects here -->
      </div>
      <div v-if="projectType === 'personal'">
        <p>Personal Projects...</p>
        <!-- Add your personal projects here -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectType: "school", // default selection
    };
  },
  methods: {
    scrollToSection(id) {
      const section = document.getElementById(id);
      section.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  color: #333;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: #fff;
}

.header-center {
  flex: 1;
  text-align: center;
}

.header-left a,
.header-right a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.5rem;
}

.header-left {
  flex: 0.2;
}

.header-right {
  flex: 0.2;
}

.header a i {
  font-size: 1.2rem;
}

/* Navigation Buttons */
.nav-buttons {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.nav-buttons button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.nav-buttons button:hover {
  background-color: #555;
}

/* Sections */
.section {
  padding: 2rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.toggle-switch {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.toggle-switch label {
  cursor: pointer;
}
</style>
