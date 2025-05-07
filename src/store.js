import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    userRole: '',
    // Load projects from localStorage, or use an empty array if not found
    projects: JSON.parse(localStorage.getItem('projects')) || []
  },
  mutations: {
    login(state, role) {
      state.isAuthenticated = true;
      state.userRole = role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = '';
    },
    addProject(state, project) {
      state.projects.push(project);
      // Save updated projects to localStorage
      localStorage.setItem('projects', JSON.stringify(state.projects));
    },
    updateProjectStatus(state, { id, status }) {
      const projectIndex = state.projects.findIndex(p => p.id === id);
      if (projectIndex !== -1 && state.projects[projectIndex].status !== 'Done') {
        state.projects[projectIndex].status = status;
        // Save updated projects to localStorage
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    },
    updateProjectDetails(state, { id, name, startDate, endDate, size }) {
      const projectIndex = state.projects.findIndex(p => p.id === id);
      if (projectIndex !== -1 && state.projects[projectIndex].status !== 'Done') {
        state.projects[projectIndex] = { ...state.projects[projectIndex], name, startDate, endDate, size };
        // Save updated projects to localStorage
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    }
  }
});

export default store;
