<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const error = urlParams.get('error')

  if (error) {
    console.error('Discord OAuth error:', error)
    router.push('/login?error=auth_failed')
    return
  }

  if (!code) {
    router.push('/login?error=no_code')
    return
  }

  try {
    const success = await authStore.handleAuthCallback(code)
    if (success) {
      router.push('/')
    } else {
      router.push('/login?error=auth_failed')
    }
  } catch (error) {
    console.error('Authentication callback error:', error)
    router.push('/login?error=auth_failed')
  }
})
</script>

<template>
  <div class="auth-callback">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Authenticating with Discord...</p>
    </div>
  </div>
</template>

<style scoped>
.auth-callback {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #e0e0e0;
}

.loading-container {
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top: 3px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

p {
  color: #888;
  font-size: 0.875rem;
}
</style> 