import axios from 'axios'

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    interviewerName: import.meta.env.VITE_INTERVIEWER_NAME ?? 'yourEnglishName',
  },
})

apiClient.interceptors.request.use((config) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)
