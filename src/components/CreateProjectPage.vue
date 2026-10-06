<template>
  <div class="create-project-container">
    <h2>Create Project</h2>

    <form @submit.prevent="createProject" class="create-form">
      <input v-model="name" placeholder="Project Name" required class="input-field" />
      <input type="date" v-model="startDate" required class="input-field" />
      <input type="date" v-model="endDate" required class="input-field" />
      <select v-model="size" class="input-field">
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
      <button type="submit" class="submit-button">Create</button>
    </form>

    <button @click="goToDashboard" class="back-button">Back to Dashboard</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const size = ref('Small');
    const userRole = computed(() => store.state.userRole);

    const createProject = () => {
      const newProject = {
        id: Date.now(),
        name: name.value,
        startDate: startDate.value,
        endDate: endDate.value,
        size: size.value,
        status: 'In Progress',
        createdBy: userRole.value, // Track who created the project
      };

      store.commit('addProject', newProject);
      router.push('/dashboard'); // Redirect to dashboard
    };

    const goToDashboard = () => {
      router.push('/dashboard');
    };

    return { name, startDate, endDate, size, createProject, goToDashboard, userRole };
  }
};
</script>

<style scoped>
.create-project-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.create-form {
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

.input-field {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s;
}

.submit-button {
  background-color: #4caf50;
  color: white;
}

.submit-button:hover {
  background-color: #45a049;
}

.back-button {
  margin-top: 20px;
  background-color: #2196f3;
  color: white;
}

.back-button:hover {
  background-color: #1976d2;
}
</style>
