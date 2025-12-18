<template>
  <Layout>
    <div class="login-page">
      <Card class="login-page__card">
        <CardHeader class="login-page__header">
          <CardTitle class="login-page__title">登录 Yusi</CardTitle>
          <CardDescription class="login-page__description">
            欢迎回来，继续你的灵魂叙事之旅
          </CardDescription>
        </CardHeader>
        <form @submit.prevent="handleSubmit">
          <CardContent class="login-page__content">
            <div class="login-page__field">
              <label class="login-page__label" for="username">
                用户名
              </label>
              <Input
                id="username"
                v-model="formData.userName"
                placeholder="请输入用户名"
                :disabled="loading"
              />
            </div>
            <div class="login-page__field">
              <label class="login-page__label" for="password">
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
          <CardFooter class="login-page__footer">
            <Button class="login-page__submit-btn" type="submit" :is-loading="loading">
              登录
            </Button>
            <div class="login-page__register-hint">
              还没有账号？
              <RouterLink to="/register" class="login-page__register-link">
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

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.login-page {
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

  &__register-hint {
    font-size: $text-sm;
    text-align: center;
    color: $muted-foreground;
  }

  &__register-link {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
