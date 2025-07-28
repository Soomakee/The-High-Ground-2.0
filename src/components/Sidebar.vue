<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const activeRoute = ref('home')

const navigateTo = (route) => {
  activeRoute.value = route
  router.push(`/${route === 'home' ? '' : route}`)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleProfile = () => {
  // Could open a profile modal or navigate to profile page
  console.log('Profile clicked')
}

// Computed properties for user data
const userDisplayName = computed(() => {
  return authStore.user?.username || 'Toji'
})

const userRole = computed(() => {
  if (authStore.hasRole('Guild Master')) return 'Guild Master'
  if (authStore.hasRole('Officer')) return 'Officer'
  if (authStore.hasRole('Event Manager')) return 'Event Manager'
  if (authStore.hasRole('Member')) return 'Member'
  return 'Guest'
})

const userAvatar = computed(() => {
  return authStore.user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${authStore.user.id}/${authStore.user.avatar}.png`
    : '/profile-placeholder.jpg'
})

// Permission-based navigation visibility
const canAccessMembers = computed(() => authStore.canManageMembers)
const canAccessInventory = computed(() => authStore.canAccessInventory)
const canAccessTodo = computed(() => authStore.hasPermission('todo:read'))
const canAccessEvents = computed(() => authStore.hasPermission('events:read'))
const canAccessHire = computed(() => authStore.hasPermission('hire:read'))
</script>

<template>
  <aside class="sidebar">
    <!-- User Profile Section -->
    <div class="profile-section">
      <div class="profile-picture">
        <img :src="userAvatar" :alt="userDisplayName" />
      </div>
      <h3 class="username">{{ userDisplayName }}</h3>
      <p class="user-role">{{ userRole }}</p>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn profile-btn" @click="handleProfile">
          <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>PROFILE</span>
        </button>
        <div class="action-divider"></div>
        <button class="action-btn logout-btn" @click="handleLogout">
          <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          <span>LOGOUT</span>
        </button>
      </div>
    </div>

    <!-- Navigation Section -->
    <nav class="navigation">
      <button 
        class="nav-item" 
        :class="{ active: activeRoute === 'home' }"
        @click="navigateTo('home')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>HOME</span>
      </button>

      <button 
        v-if="canAccessMembers"
        class="nav-item" 
        :class="{ active: activeRoute === 'members' }"
        @click="navigateTo('members')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.74L9.01 9C8.54 8.37 7.8 8 7 8H5.46c-.8 0-1.54.37-2.01 1L.96 16.37A1.5 1.5 0 0 0 2.5 18H5v6h2v-6h1v6h2v-6h1v6h2z"/>
        </svg>
        <span>MEMBER LIST</span>
      </button>

      <button 
        v-if="canAccessInventory"
        class="nav-item" 
        :class="{ active: activeRoute === 'inventory' }"
        @click="navigateTo('inventory')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
        </svg>
        <span>GUILD INVENTORY</span>
      </button>

      <button 
        v-if="canAccessTodo"
        class="nav-item" 
        :class="{ active: activeRoute === 'todo' }"
        @click="navigateTo('todo')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>TO DO</span>
      </button>

      <button 
        v-if="canAccessEvents"
        class="nav-item" 
        :class="{ active: activeRoute === 'events' }"
        @click="navigateTo('events')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
        <span>EVENTS</span>
      </button>

      <button 
        v-if="canAccessHire"
        class="nav-item" 
        :class="{ active: activeRoute === 'hire' }"
        @click="navigateTo('hire')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
        <span>FOR HIRE</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  border-right: 1px solid #8b5cf6;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

/* Profile Section */
.profile-section {
  padding: 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid #333;
}

.profile-picture {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  border: 2px solid #8b5cf6;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  overflow: hidden;
  background: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-picture:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
  border-color: #a855f7;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  color: #8b5cf6;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  transition: all 0.3s ease;
}

.username:hover {
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
  transform: scale(1.02);
}

.user-role {
  color: #888;
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
  font-weight: 400;
  transition: color 0.3s ease;
}

.user-role:hover {
  color: #a0a0a0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #888;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.profile-btn:hover {
  color: #8b5cf6;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.logout-btn:hover {
  color: #f97316;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.action-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.action-btn:hover .action-icon {
  transform: scale(1.1);
}

.action-divider {
  width: 1px;
  height: 20px;
  background: #333;
  transition: background 0.3s ease;
}

.action-buttons:hover .action-divider {
  background: #555;
}

/* Navigation */
.navigation {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  color: #888;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.875rem 1.5rem;
  margin: 0 0.25rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: calc(100% - 0.5rem);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #8b5cf6 0%, #a855f7 100%);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 2px 2px 0;
}

.nav-item:hover::before {
  transform: translateX(0);
}

.nav-item:hover::after {
  transform: scaleY(1);
}

.nav-item:hover {
  color: #e0e0e0;
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(139, 92, 246, 0.1) 100%);
  color: white;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
  transform: translateX(8px);
}

.nav-item.active::before {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%);
  transform: translateX(0);
}

.nav-item.active::after {
  background: linear-gradient(180deg, #a855f7 0%, #c084fc 100%);
  transform: scaleY(1);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
}

.nav-item.active:hover {
  background: linear-gradient(90deg, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(168, 85, 247, 0.15) 100%);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  transform: translateX(8px) scale(1.02);
}

.nav-item.active:hover::after {
  background: linear-gradient(180deg, #c084fc 0%, #d8b4fe 100%);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.7);
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.1) rotate(5deg);
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

/* Custom colors for specific nav items */
.nav-item:nth-child(2) .nav-icon { color: #8b5cf6; }
.nav-item:nth-child(3) .nav-icon { color: #d97706; }
.nav-item:nth-child(4) .nav-icon { color: #10b981; }
.nav-item:nth-child(5) .nav-icon { color: #a855f7; }
.nav-item:nth-child(6) .nav-icon { color: #dc2626; }

.nav-item.active .nav-icon {
  color: white;
}

/* Hover effects for specific nav items */
.nav-item:nth-child(2):hover .nav-icon { 
  color: #a855f7; 
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
}
.nav-item:nth-child(3):hover .nav-icon { 
  color: #f59e0b; 
  filter: drop-shadow(0 0 8px rgba(217, 119, 6, 0.5));
}
.nav-item:nth-child(4):hover .nav-icon { 
  color: #34d399; 
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
}
.nav-item:nth-child(5):hover .nav-icon { 
  color: #c084fc; 
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
}
.nav-item:nth-child(6):hover .nav-icon { 
  color: #ef4444; 
  filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.5));
}
</style> 