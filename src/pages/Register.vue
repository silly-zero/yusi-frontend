<template>
  <Layout>
    <div class="register-page">
      <Card class="register-page__card">
        <CardHeader class="register-page__header">
          <CardTitle class="register-page__title">创建账号</CardTitle>
          <CardDescription class="register-page__description">
            开启你的 Yusi 之旅
          </CardDescription>
        </CardHeader>
        <form @submit.prevent="handleSubmit">
          <CardContent class="register-page__content">
            <div class="register-page__field">
              <label class="register-page__label" for="username">
                用户名
              </label>
              <Input
                id="username"
                v-model="formData.userName"
                placeholder="请输入用户名"
                :disabled="loading"
              />
            </div>
            <div class="register-page__field">
              <label class="register-page__label" for="email">
                邮箱 (可选)
              </label>
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="name@example.com"
                :disabled="loading"
              />
            </div>
            <div class="register-page__field">
              <label class="register-page__label" for="password">
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
            <div class="register-page__field">
              <label class="register-page__label" for="confirmPassword">
                确认密码
              </label>
              <Input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                :disabled="loading"
              />
            </div>
          </CardContent>
          <CardFooter class="register-page__footer">
            <Button class="register-page__submit-btn" type="submit" :is-loading="loading">
              注册
            </Button>
            <div class="register-page__login-hint">
              已有账号？
              <RouterLink to="/login" class="register-page__login-link">
                立即登录
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
  password: '',
  confirmPassword: '',
  email: ''
})

const handleSubmit = async () => {
  if (!formData.value.userName || !formData.value.password) return

  if (formData.value.password !== formData.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  loading.value = true
  try {
    const res = await authApi.register({
      userName: formData.value.userName,
      password: formData.value.password,
      email: formData.value.email
    })
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

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;

  &__card {
    width: 100%;
    max-width: 28rem;
    margin: 0 $spacing-md;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    font-size: $text-2xl;
    font-weight: bold;
    text-align: center;
  }

  &__description {
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-size: $text-sm;
    font-weight: 500;
    line-height: 1;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__submit-btn {
    width: 100%;
  }

  &__login-hint {
    font-size: $text-sm;
    text-align: center;
    color: $muted-foreground;
  }

  &__login-link {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
