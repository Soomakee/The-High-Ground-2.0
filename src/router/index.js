import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallback.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MembersView.vue'),
      meta: { requiresAuth: true, permission: 'members:read' }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/InventoryView.vue'),
      meta: { requiresAuth: true, permission: 'inventory:read' }
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
      meta: { requiresAuth: true, permission: 'todo:read' }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: { requiresAuth: true, permission: 'events:read' }
    },
    {
      path: '/hire',
      name: 'hire',
      component: () => import('../views/HireView.vue'),
      meta: { requiresAuth: true, permission: 'hire:read' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  try {
    const authStore = useAuthStore()
    
    // Initialize auth state if not already done
    if (!authStore.isAuthenticated) {
      authStore.initializeAuth()
    }
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
      return
    }
    
    // Check if route requires specific permission
    if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
      // Redirect to home if user doesn't have permission
      next('/')
      return
    }
    
    // If user is authenticated and trying to access login, redirect to home
    if (to.name === 'login' && authStore.isAuthenticated) {
      next('/')
      return
    }
    
    next()
  } catch (error) {
    // If there's an error with the auth store, allow navigation
    console.warn('Auth store not available:', error)
    next()
  }
})

export default router
