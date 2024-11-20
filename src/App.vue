<template>
  <div class="parallax-website">
    <section 
      class="hero" 
      :style="{ backgroundImage: `url(${backgroundImage})` }"
      @mousemove="updateParallax"
    >
      <div class="hero-content" :style="{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }">
        <h1>{{ name }}</h1>
        <p>{{ profession }}</p>
      </div>
    </section>

    <section class="about-me">
      <div class="container">
        <h2>About Me</h2>
        <p>{{ aboutDescription }}</p>
        <div class="skills">
          <h3>Skills</h3>
          <ul>
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="projects">
      <div class="container">
        <h2>My Work</h2>
        <div class="project-grid">
          <div 
            v-for="project in projects" 
            :key="project.name" 
            class="project-card"
          >
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank">View Project</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Jane Doe',
      profession: 'Software Developer & Designer',
      backgroundImage: '/api/placeholder/1920/1080',
      aboutDescription: 'Passionate developer with expertise in modern web technologies and creating intuitive user experiences.',
      parallaxX: 0,
      parallaxY: 0,
      skills: [
        'Vue.js', 
        'React', 
        'JavaScript', 
        'CSS', 
        'UI/UX Design'
      ],
      projects: [
        {
          name: 'Project Alpha',
          description: 'A complex web application solving real-world problems.',
          link: '#'
        },
        {
          name: 'Design System',
          description: 'Comprehensive design system for enterprise applications.',
          link: '#'
        }
      ]
    }
  },
  methods: {
    updateParallax(event) {
      const container = event.currentTarget;
      const containerRect = container.getBoundingClientRect();
      
      const mouseX = event.clientX - (containerRect.left + containerRect.width / 2);
      const mouseY = event.clientY - (containerRect.top + containerRect.height / 2);

      this.parallaxX = mouseX * 0.05;
      this.parallaxY = mouseY * 0.05;
    }
  }
}
</script>

<style scoped>
.parallax-website {
  font-family: 'Arial', sans-serif;
}

.hero {
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.about-me, .projects {
  padding: 4rem 2rem;
  background-color: #f4f4f4;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.project-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>