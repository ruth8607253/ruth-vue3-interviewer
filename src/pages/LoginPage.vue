<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginPayload } from '@/types/auth'
import '@/styles/login.css'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const loading = ref(false)

const onSubmit = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    const payload: LoginPayload = {
      email: email.value.trim(),
      password: password.value.trim(),
    }
    await authStore.login(payload)
    await router.push({ name: 'Accounts' })
  } catch (error) {
    errorMessage.value = '登入失敗，請檢查 Email 與密碼。'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <!-- Main Card -->
    <div>
      <div class="login-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 9h-4v2h4v9H2V9h4V7H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h2V7h-4v2z"/>
              <path d="M8 5.5L6.59 6.91 11 11.32V0h2v11.32l4.41-4.41L16 6.5 12 2.5 8 5.5z"/>
            </svg>
          </div>
          <h1 class="card-title">歡迎回來</h1>
          <p class="card-subtitle">請登入您的帳號以繼續</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="onSubmit" class="login-form">
          <!-- Email Field -->
          <div class="form-group">
            <label class="form-label">電子郵件</label>
            <div class="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.511l-8 5.047-8-5.047V6Zm-16 12V8.113l7.256 4.58a1 1 0 0 0 1.02 0L20 8.113V18Z"/>
              </svg>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label class="form-label">密碼</label>
            <div class="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8V7a5 5 0 0 0-10 0v1H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-8-1a3 3 0 0 1 6 0v1H9Zm9 13H6V10h12Z"/>
              </svg>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Form Options -->
          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkbox-label">記住我</span>
            </label>
            <button type="button" class="forgot-password-link">忘記密碼？</button>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="login-button"
            :disabled="loading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 9h-4v2h4v9H2V9h4V7H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h2V7h-4v2z"/>
              <path d="M8 5.5L6.59 6.91 11 11.32V0h2v11.32l4.41-4.41L16 6.5 12 2.5 8 5.5z"/>
            </svg>
            <span v-if="!loading">登入</span>
            <span v-else>登入中...</span>
          </button>
        </form>

        <!-- Hint Box -->
        <div class="hint-box">
          <svg class="hint-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
          <p class="hint-text">提示：輸入任意電子郵件和密碼即可登入</p>
        </div>
      </div>

      <!-- Footer Link -->
      <div class="signup-link">
        還沒有帳號？<a href="#" class="signup-link-text">立即註冊</a>
      </div>
    </div>
  </div>
</template>
