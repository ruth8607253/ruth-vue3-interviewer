<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { fetchAccounts } from '@/api/account'
import type { Account, AccountStatus, RoleLevel } from '@/types/account'
import '@/styles/account.css'

const router = useRouter()
const authStore = useAuthStore()
const accounts = ref<Account[]>([])
const searchQuery = ref('')
const loading = ref(false)
const errorMessage = ref('')

const statusMap: Record<AccountStatus, string> = {
  ON: '啟用中',
  OFF: '已停用',
}

const roleMap: Record<RoleLevel, string> = {
  ADMIN: '管理員',
  EDITOR: '編輯',
  USER: '用戶',
  CLIENT: '客戶',
}

const fetchData = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    accounts.value = await fetchAccounts()
  } catch (error) {
    errorMessage.value = '無法讀取帳號資料，請稍後再試。'
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  authStore.logout()
  await router.push({ name: 'Login' })
}

const filteredAccounts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return accounts.value
  return accounts.value.filter((account) => {
    return [account.name, account.email, account.roleLevel]
      .some((value) => value.toLowerCase().includes(query))
  })
})

const totalCount = computed(() => accounts.value.length)
const activeCount = computed(() => accounts.value.filter((account) => account.status === 'ON').length)
const inactiveCount = computed(() => accounts.value.filter((account) => account.status === 'OFF').length)

const emptyState = computed(() => !loading.value && filteredAccounts.value.length === 0)

const handleCreateAccount = () => {
  errorMessage.value = '新增帳號功能尚未實作。'
}

const handleEditAccount = (account: Account) => {
  console.log('編輯帳號:', account)
}

const handleDeleteAccount = (account: Account) => {
  console.log('刪除帳號:', account)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="account-container">
    <!-- Header -->
    <div class="header-top">
      <div class="header-left">
        <div class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z"/>
          </svg>
        </div>
        <div class="header-text">
          <h1>帳號號管理系統</h1>
          <p>管理您的所有張號</p>
        </div>
      </div>
      <div class="header-right" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 9h-4v2h4v9H2V9h4V7H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h2V7h-4v2z"/>
          <path d="M8 5.5L6.59 6.91 11 11.32V0h2v11.32l4.41-4.41L16 6.5 12 2.5 8 5.5z"/>
        </svg>
        <span>登出</span>
      </div>
    </div>
    <section>
    

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.5 3a7.5 7.5 0 1 0 7.5 7.5A7.508 7.508 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1-5.5 5.5A5.506 5.506 0 0 1 10.5 5Zm11 14.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.5a1 1 0 0 1 1-1h16.5a1 1 0 0 1 1 1Z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋帳號(姓名、郵件、角色)..."
        />
      </div>
      <button class="btn-add" @click="handleCreateAccount">
        <span style="font-size: 18px;">+</span>
        新增帳號
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">總帳號數</div>
        <div class="stat-value">{{ totalCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">啟用</div>
        <div class="stat-value">{{ activeCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">停用</div>
        <div class="stat-value">{{ inactiveCount }}</div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-state">
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      讀取中，請稍候...
    </div>

    <!-- Empty State -->
    <div v-else-if="emptyState" class="empty-state">
      目前沒有任何帳號資料。
    </div>

    <!-- User Cards Grid -->
    <div v-else-if="filteredAccounts.length > 0" class="user-cards-grid">
      <div v-for="account in filteredAccounts" :key="account.id" class="user-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="user-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z"/>
            </svg>
          </div>
          <div class="card-header-info">
            <div class="user-name">{{ account.name }}</div>
            <div class="status-badge" :class="account.status === 'ON' ? 'active' : 'inactive'">
              <span class="status-dot"></span>
              {{ statusMap[account.status] }}
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <div class="card-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.511l-8 5.047-8-5.047V6Zm-16 12V8.113l7.256 4.58a1 1 0 0 0 1.02 0L20 8.113V18Z"/>
            </svg>
            {{ account.email }}
          </div>
          <div class="card-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z"/>
            </svg>
            {{ roleMap[account.roleLevel] }}
          </div>
          <div class="card-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 16H5V5h14Z"/>
            </svg>
            {{ new Date(account.createdAt).toLocaleDateString() }}
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <button class="btn-edit" @click="handleEditAccount(account)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z"/>
              <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"/>
            </svg>
            編輯
          </button>
          <button class="btn-delete" @click="handleDeleteAccount(account)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4Z"/>
            </svg>
            刪除
          </button>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>
