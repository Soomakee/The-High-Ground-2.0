<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  // Check if user is already authenticated
  if (authStore.isAuthenticated) {
    router.push('/')
    return
  }

  // Try to restore auth state from localStorage
  authStore.initializeAuth()
  if (authStore.isAuthenticated) {
    router.push('/')
    return
  }
})

const handleDiscordLogin = () => {
  authStore.loginWithDiscord()
}

const getErrorMessage = () => {
  const error = route.query.error
  switch (error) {
    case 'auth_failed':
      return 'Authentication failed. Please try again.'
    case 'no_code':
      return 'No authorization code received.'
    case 'access_denied':
      return 'Access denied. Please authorize the application.'
    default:
      return null
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-container">
      <div class="login-header">
        <h1>The High Ground</h1>
        <p class="subtitle">Guild Management Terminal</p>
      </div>

      <div class="login-content">
        <div class="welcome-section">
          <h2>Welcome Back</h2>
          <p>Sign in with your Discord account to access the guild management system.</p>
        </div>

        <div class="auth-section">
          <button 
            class="discord-login-btn" 
            @click="handleDiscordLogin"
            :disabled="authStore.isLoading"
          >
            <svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>{{ authStore.isLoading ? 'Connecting...' : 'Continue with Discord' }}</span>
          </button>

          <div v-if="getErrorMessage()" class="error-message">
            {{ getErrorMessage() }}
          </div>
        </div>

        <div class="features-section">
          <h3>Features</h3>
          <ul>
            <li>Guild member management</li>
            <li>Inventory tracking</li>
            <li>Event creation and management</li>
            <li>Role-based permissions</li>
            <li>Real-time updates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #e0e0e0;
  padding: 2rem;
  box-sizing: border-box;
}

.login-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #333;
  border-radius: 12px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #8b5cf6;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.subtitle {
  color: #888;
  font-size: 1rem;
  margin: 0;
}

.login-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-section {
  text-align: center;
}

.welcome-section h2 {
  color: #e0e0e0;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.welcome-section p {
  color: #888;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.auth-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.discord-login-btn {
  background: #5865f2;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.discord-login-btn:hover:not(:disabled) {
  background: #4752c4;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(88, 101, 242, 0.3);
}

.discord-login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.discord-icon {
  width: 24px;
  height: 24px;
}

.error-message {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid #dc2626;
  border-radius: 6px;
  padding: 0.75rem;
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
}

.features-section {
  border-top: 1px solid #333;
  padding-top: 1.5rem;
}

.features-section h3 {
  color: #8b5cf6;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.features-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.features-section li {
  color: #888;
  font-size: 0.875rem;
  padding-left: 1.5rem;
  position: relative;
}

.features-section li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

@media (max-width: 768px) {
  .login-container {
    padding: 2rem;
  }
  
  .login-header h1 {
    font-size: 2rem;
  }
}
</style> 