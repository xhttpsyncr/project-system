<template>
  <div class="login-container">
    <h2>Login</h2>
    <div class="buttons">
      <button @click="login('admin')">Login as Admin</button>
      <button @click="login('user')">Login as User</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = (role) => {
      store.commit('login', role);
      router.push('/dashboard');
    };
    return { login };
  }
};
</script>

<style scoped>
/* Center the login container */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:focus {
  outline: none;
}
</style>
