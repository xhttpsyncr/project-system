import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import EditProjectPage from './components/EditProjectPage.vue';
import store from './store';
import CreateProjectPage from './components/CreateProjectPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/edit/:id', component: EditProjectPage, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/create', component: CreateProjectPage, meta: { requiresAuth: true } } // Admin-specific guard removed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  const userRole = store.state.userRole;

  // Check if user is logged in
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/');
  }

  // Redirect users trying to access admin routes if they aren't admin
  if (to.meta.requiresAdmin && userRole !== 'admin') {
    return next('/dashboard');
  }

  // Keep the project state intact when navigating between routes
  if (!store.state.projects) {
    store.state.projects = []; // Ensures projects are always available
  }

  next();
});

export default router;
