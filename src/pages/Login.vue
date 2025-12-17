<template>
  <Layout>
    <div class="flex items-center justify-center min-h-[60vh]">
      <Card class="w-full max-w-md mx-4">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center">登录 Yusi</CardTitle>
          <CardDescription class="text-center">
            欢迎回来，继续你的灵魂叙事之旅
          </CardDescription>
        </CardHeader>
        <form @submit.prevent="handleSubmit">
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="username">
                用户名
              </label>
              <Input
                id="username"
                v-model="formData.userName"
                placeholder="请输入用户名"
                :disabled="loading"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="password">
                密码
              </label>
              <Input
                id="password"
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
                :disabled="loading"
              />
            </div>
          </CardContent>
          <CardFooter class="flex flex-col gap-4">
            <Button class="w-full" type="submit" :is-loading="loading">
              登录
            </Button>
            <div class="text-sm text-center text-muted-foreground">
              还没有账号？
              <RouterLink to="/register" class="text-primary hover:underline">
                立即注册
              </RouterLink>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/lib/api'
import Layout from '@/components/Layout.vue'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const formData = ref({
  userName: '',
  password: ''
})

const handleSubmit = async () => {
  if (!formData.value.userName || !formData.value.password) return

  loading.value = true
  try {
    const res = await authApi.login(formData.value)
    const user = res.data.data
    authStore.login(user, user.token)
    localStorage.setItem('yusi-user-id', user.userId)
    router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
