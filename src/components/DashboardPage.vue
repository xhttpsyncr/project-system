<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <div class="actions">
      <button @click="logout" class="logout-button">Logout</button>
      <button v-if="userRole === 'admin' || userRole === 'user'" @click="goToCreateProject" class="create-button">
        Create Project
      </button>
    </div>
    <ul class="projects-list">
      <li v-for="project in projects" :key="project.id" class="project-item">
        <div class="project-details">
          <span><strong>Name:</strong> {{ project.name }}</span>
          <span><strong>Status:</strong> {{ project.status }}</span>
          <span><strong>Start Date:</strong> {{ project.startDate }}</span>
          <span><strong>End Date:</strong> {{ project.endDate }}</span>
          <span><strong>Size:</strong> {{ project.size }}</span>
        </div>
        <router-link v-if="userRole === 'admin'" :to="`/edit/${project.id}`" class="edit-link">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const projects = computed(() => store.state.projects);
    const userRole = computed(() => store.state.userRole);

    const logout = () => {
      store.commit('logout');
      router.push('/');
    };

    const goToCreateProject = () => {
      router.push('/create');
    };

    return { projects, userRole, logout, goToCreateProject };
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s;
}

.logout-button {
  background-color: #f44336;
  color: white;
}

.create-button {
  background-color: #4caf50;
  color: white;
}

button:hover {
  opacity: 0.8;
}

.projects-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.project-details {
  display: flex;
  flex-direction: column;
}

.edit-link {
  color: #2196f3;
  text-decoration: none;
  font-weight: bold;
}

.edit-link:hover {
  text-decoration: underline;
}
</style>
