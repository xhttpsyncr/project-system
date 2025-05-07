<template>
  <div v-if="project" class="edit-project-container">
    <h2>Edit Project</h2>
    <p><strong>Project Name:</strong> {{ project.name }}</p>
    <p><strong>Start Date:</strong> {{ project.startDate }}</p>
    <p><strong>End Date:</strong> {{ project.endDate }}</p>
    <p><strong>Size:</strong> {{ project.size }}</p>
    <p><strong>Status:</strong> {{ project.status }}</p>

    <p v-if="userRole !== 'admin'" class="admin-message">Only admins can mark the project as "Done".</p>

    <form v-if="userRole === 'admin' && project.status !== 'Done'" @submit.prevent="updateStatus" class="edit-form">
      <button type="submit" class="status-button">Mark as Done</button>
    </form>

    <p v-if="project.status === 'Done'" class="completed-message">This project is completed and cannot be edited.</p>

    <button v-if="project.status === 'Done'" @click="goToCreatePage" class="back-button">Okay</button>
  </div>

  <div v-else class="loading-message">
    <p>Loading project...</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const project = store.state.projects.find(p => p.id == route.params.id);
    const userRole = computed(() => store.state.userRole);

    const updateStatus = () => {
      if (userRole.value !== 'admin') return;

      store.commit('updateProjectStatus', { id: project.id, status: 'Done' });
      router.push('/dashboard');
    };

    const goToCreatePage = () => {
      router.push('/create');
    };

    return { project, updateStatus, goToCreatePage, userRole };
  }
};
</script>

<style scoped>
/* Container for the Edit Project page */
.edit-project-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

/* Title styling */
h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

/* Message for Admins */
.admin-message {
  color: #f44336;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Form and button styling */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s;
}

.status-button {
  background-color: #ff9800;
  color: white;
  margin-top: 10px;
}

.status-button:hover {
  background-color: #fb8c00;
}

.back-button {
  background-color: #2196f3;
  color: white;
  margin-top: 10px;
}

.back-button:hover {
  background-color: #1976d2;
}

.completed-message {
  color: #f44336;
  font-size: 1.2rem;
  margin-top: 20px;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}
</style>
