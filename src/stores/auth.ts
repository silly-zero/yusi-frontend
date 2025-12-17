import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id?: number
  userId: string
  userName: string
  email?: string
  token?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const currentUser = computed(() => user.value)

  // Actions
  const login = (userData: User, tokenValue: string, refreshTokenValue?: string) => {
    user.value = userData
    token.value = tokenValue
    if (refreshTokenValue) {
      refreshToken.value = refreshTokenValue
    }

    // Save to localStorage
    localStorage.setItem('yusi-auth-storage', JSON.stringify({
      user: userData,
      token: tokenValue,
      refreshToken: refreshTokenValue
    }))
  }

  const logout = () => {
    user.value = null
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('yusi-auth-storage')
    localStorage.removeItem('yusi-user-id')
  }

  const setToken = (newToken: string) => {
    token.value = newToken

    // Update localStorage
    const stored = localStorage.getItem('yusi-auth-storage')
    if (stored) {
      const data = JSON.parse(stored)
      data.token = newToken
      localStorage.setItem('yusi-auth-storage', JSON.stringify(data))
    }
  }

  // Initialize from localStorage
  const init = () => {
    const stored = localStorage.getItem('yusi-auth-storage')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        user.value = data.user
        token.value = data.token
        refreshToken.value = data.refreshToken
      } catch (e) {
        console.error('Failed to parse auth storage:', e)
        logout()
      }
    }
  }

  return {
    // State
    user,
    token,
    refreshToken,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    login,
    logout,
    setToken,
    init
  }
}, {
  persist: true
})
