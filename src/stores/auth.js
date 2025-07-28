import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const permissions = ref([])
  const discordRoles = ref([])

  // Discord OAuth2 Configuration
  const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
  const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI || 'http://localhost:5173/auth/callback'
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

  // Computed
  const hasPermission = computed(() => {
    return (permission) => {
      return permissions.value.includes(permission)
    }
  })

  const hasRole = computed(() => {
    return (role) => {
      return discordRoles.value.includes(role)
    }
  })

  const canAccessInventory = computed(() => {
    return hasPermission.value('inventory:read') || hasRole.value('Guild Master') || hasRole.value('Officer')
  })

  const canEditInventory = computed(() => {
    return hasPermission.value('inventory:write') || hasRole.value('Guild Master') || hasRole.value('Officer')
  })

  const canCreateEvents = computed(() => {
    return hasPermission.value('events:create') || hasRole.value('Guild Master') || hasRole.value('Officer') || hasRole.value('Event Manager')
  })

  const canManageMembers = computed(() => {
    return hasPermission.value('members:manage') || hasRole.value('Guild Master') || hasRole.value('Officer')
  })

  // Actions
  const loginWithDiscord = () => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds.members.read`
    window.location.href = authUrl
  }

  const handleAuthCallback = async (code) => {
    try {
      isLoading.value = true
      
      const response = await axios.post(`${API_BASE_URL}/auth/discord`, {
        code,
        redirect_uri: DISCORD_REDIRECT_URI
      })

      const { user: userData, permissions: userPermissions, roles } = response.data
      
      user.value = userData
      permissions.value = userPermissions
      discordRoles.value = roles
      isAuthenticated.value = true

      // Store in localStorage for persistence
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_data', JSON.stringify(userData))
      localStorage.setItem('user_permissions', JSON.stringify(userPermissions))
      localStorage.setItem('user_roles', JSON.stringify(roles))

      return true
    } catch (error) {
      console.error('Authentication error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    permissions.value = []
    discordRoles.value = []
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    localStorage.removeItem('user_permissions')
    localStorage.removeItem('user_roles')
  }

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return false

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const { user: userData, permissions: userPermissions, roles } = response.data
      
      user.value = userData
      permissions.value = userPermissions
      discordRoles.value = roles
      isAuthenticated.value = true

      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
      return false
    }
  }

  const refreshUserData = async () => {
    if (!isAuthenticated.value) return

    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const { user: userData, permissions: userPermissions, roles } = response.data
      
      user.value = userData
      permissions.value = userPermissions
      discordRoles.value = roles
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  // Initialize auth state from localStorage
  const initializeAuth = () => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    const userPermissions = localStorage.getItem('user_permissions')
    const userRoles = localStorage.getItem('user_roles')

    if (token && userData) {
      user.value = JSON.parse(userData)
      permissions.value = JSON.parse(userPermissions || '[]')
      discordRoles.value = JSON.parse(userRoles || '[]')
      isAuthenticated.value = true
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    permissions,
    discordRoles,
    
    // Computed
    hasPermission,
    hasRole,
    canAccessInventory,
    canEditInventory,
    canCreateEvents,
    canManageMembers,
    
    // Actions
    loginWithDiscord,
    handleAuthCallback,
    logout,
    checkAuthStatus,
    refreshUserData,
    initializeAuth
  }
}) 