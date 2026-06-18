import { defineStore } from 'pinia'
import { loginWithCredentials, refreshAuthToken } from '@/api/auth'
import { setAccessToken } from '@/api/axios'
import type { AuthState, LoginPayload } from '@/types/auth'

const AUTH_STORAGE_KEY = 'ruth-vue-auth'

const loadAuthFromStorage = (): AuthState => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) {
    return { accessToken: null, refreshToken: null, expiresAt: null, user: null }
  }
  try {
    return JSON.parse(raw) as AuthState
  } catch {
    return { accessToken: null, refreshToken: null, expiresAt: null, user: null }
  }
}

const saveAuthToStorage = (state: AuthState) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadAuthFromStorage(),
  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
    tokenExpiresIn: (state) => {
      if (!state.expiresAt) return 0
      return Math.max(state.expiresAt - Date.now(), 0)
    },
  },
  actions: {
    async login(payload: LoginPayload) {
      const result = await loginWithCredentials(payload)
      this.accessToken = result.accessToken
      this.refreshToken = result.refreshToken
      this.expiresAt = result.expiresAt
      this.user = result.user
      setAccessToken(result.accessToken)
      saveAuthToStorage(this.$state)
    },
    async refresh() {
      if (!this.refreshToken) {
        throw new Error('Missing refresh token')
      }
      const result = await refreshAuthToken(this.refreshToken)
      this.accessToken = result.accessToken
      this.refreshToken = result.refreshToken
      this.expiresAt = result.expiresAt
      this.user = result.user
      setAccessToken(result.accessToken)
      saveAuthToStorage(this.$state)
    },
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.expiresAt = null
      this.user = null
      setAccessToken(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },
  },
})
