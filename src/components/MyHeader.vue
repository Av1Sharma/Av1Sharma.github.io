<template>
  <header class="header">
    <!-- Name on the left -->
    <div class="name">
      Avi Sharma
    </div>

    <!-- Email or Phone in the center -->
    <div class="contact-info">
      <span>{{ email }}</span>
      <span>{{ phoneNumber }}</span>
    </div>

    <!-- Icons on the right -->
    <div class="icons">
      <a :href="githubUrl" target="_blank" class="icon">
        <i class="fab fa-github"></i>
      </a>
      <a :href="linkedinUrl" target="_blank" class="icon">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </header>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'MyHeader',  // Ensure the name is multi-word
  data() {
    return {
      email: 'asharmava1@gmail.com',
      phoneNumber: '703-389-6711',
      githubUrl: 'https://github.com/Av1Sharma',
      linkedinUrl: 'https://linkedin.com/in/yourusername'
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
}

.name {
  font-size: 24px;
  font-weight: bold;
  flex: 1;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex: 2;
}

.contact-info span {
  color: white;
  font-size: 14px;
  margin: 0 10px;
}

.icons {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.icon {
  color: white;
  font-size: 18px;
}

.icon:hover {
  color: #0077b5; /* LinkedIn blue */
}
</style>
