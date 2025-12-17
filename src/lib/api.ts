import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'

export const API_BASE = '/api'

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  if (authStore.refreshToken) {
    config.headers['X-Refresh-Token'] = authStore.refreshToken
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (res) => {
    const newToken = res.headers['x-new-access-token']
    if (newToken) {
      const authStore = useAuthStore()
      authStore.setToken(newToken)
    }
    return res
  },
  (err) => {
    const msg = err.response?.data?.message || err.message
    if (err.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      // Optional: navigate to login
      // router.push('/login')
    }
    // Show error toast
    console.error('API Error:', msg)
    return Promise.reject(err)
  }
)

// Auth API
export const authApi = {
  login: (data: { userName: string; password: string }) =>
    api.post('/user/login', data),
  register: (data: { userName: string; password: string; email?: string }) =>
    api.post('/user/register', data),
  logout: () => api.post('/user/logout'),
}

// Diary API
export const diaryApi = {
  list: (params: any) => api.get('/diary/list', { params }),
  get: (id: string) => api.get(`/diary/${id}`),
  create: (data: any) => api.post('/diary', data),
  update: (data: any) => api.put('/diary', data),
  delete: (id: string) => api.delete(`/diary/${id}`),
}

// Room API
export const roomApi = {
  create: (data: any) => api.post('/room/create', data),
  join: (data: any) => api.post('/room/join', data),
  start: (data: any) => api.post('/room/start', data),
  submit: (data: any) => api.post('/room/submit', data),
  getReport: (code: string) => api.get(`/room/report/${code}`),
}

// AI API
export const aiApi = {
  chat: (data: { userId: string; message: string }) =>
    api.post('/ai/chat/stream', data),
}
