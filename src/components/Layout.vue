<template>
  <div class="layout">
    <!-- Header -->
    <header class="layout__header">
      <div class="layout__header-content">
        <div class="layout__brand">
          <RouterLink to="/" class="layout__logo">
            <span class="layout__logo-icon">Y</span>
            <span class="layout__logo-text">Yusi · 灵魂叙事</span>
          </RouterLink>
          <nav class="layout__nav">
            <RouterLink
              v-for="item in navItems"
              :key="item.href"
              :to="item.href"
              class="layout__nav-item"
              :class="{ 'layout__nav-item--active': route.path === item.href }"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>
        <div class="layout__actions">
          <nav class="layout__user-nav">
            <template v-if="authStore.user">
              <div class="layout__user-info">
                <div class="layout__user-badge">
                  <UserIcon class="layout__user-icon" />
                  <span class="layout__user-name">
                    {{ authStore.user.userName }}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  @click="handleLogout"
                  title="退出登录"
                >
                  <LogOut class="layout__icon" />
                </Button>
              </div>
            </template>
            <template v-else>
              <div class="layout__auth-buttons">
                <RouterLink to="/login">
                  <Button variant="ghost" size="sm">登录</Button>
                </RouterLink>
                <RouterLink to="/register">
                  <Button size="sm">注册</Button>
                </RouterLink>
              </div>
            </template>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              class="layout__icon-btn"
            >
              <Github class="layout__icon" />
              <span class="sr-only">GitHub</span>
            </a>
            <button
              @click="toggleTheme"
              class="layout__icon-btn layout__theme-toggle"
            >
              <Sun class="layout__sun" />
              <Moon class="layout__moon" />
              <span class="sr-only">Toggle theme</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="layout__main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="layout__footer">
      <div class="layout__footer-content">
        <p class="layout__footer-text">
          Built by <span class="layout__footer-link">Yusi Team</span>. The source code is available on <span class="layout__footer-link">GitHub</span>.
        </p>
      </div>
    </footer>

    <!-- Chat Widget -->
    <ChatWidget v-if="authStore.user" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Moon, Sun, Github, LogOut, UserIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui'
import ChatWidget from './ChatWidget.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  { label: '首页', href: '/' },
  { label: '情景室', href: '/room' },
  { label: 'AI知己', href: '/diary' },
]

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 切换主题（带平滑过渡动画）
const toggleTheme = () => {
  // 添加过渡类
  document.documentElement.classList.add('transitioning')

  // 切换主题
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')

  // 300ms 后移除过渡类（与 CSS 过渡时间一致）
  setTimeout(() => {
    document.documentElement.classList.remove('transitioning')
  }, 300)
}

const handleLogout = () => {
  authStore.logout()
  localStorage.removeItem('yusi-user-id')
  router.push('/login')
}

// 组件挂载时初始化主题
onMounted(() => {
  initTheme()
})
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;
@use '@/styles/utils/mixins' as *;

.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: $background;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;

  &__header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
    background-color: color-mix(in srgb, var(--background) 95%, transparent);
    backdrop-filter: blur(8px);
  }

  &__header-content {
    display: flex;
    height: 3.5rem;
    max-width: 1536px;
    align-items: center;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }

  &__brand {
    display: flex;
    margin-right: $spacing-md;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-right: $spacing-lg;
    text-decoration: none;
    color: inherit;
  }

  &__logo-icon {
    display: inline-flex;
    height: 1.5rem;
    width: 1.5rem;
    align-items: center;
    justify-content: center;
    border-radius: $radius-lg;
    background-color: $primary;
    color: $primary-foreground;
    font-weight: bold;
  }

  &__logo-text {
    display: none;
    font-weight: bold;

    @include sm {
      display: inline-block;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    font-size: $text-sm;
    font-weight: 500;
  }

  &__nav-item {
    transition: $transition-base;
    color: color-mix(in srgb, var(--foreground) 60%, transparent);
    text-decoration: none;

    &:hover {
      color: color-mix(in srgb, var(--foreground) 80%, transparent);
    }

    &--active {
      color: $foreground;
    }
  }

  &__actions {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: $spacing-sm;
  }

  &__user-nav {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__user-info {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__user-badge {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: 0.375rem $spacing-sm;
    border-radius: $radius-full;
    background-color: color-mix(in srgb, var(--secondary) 50%, transparent);
  }

  &__user-icon {
    height: 1rem;
    width: 1rem;
    color: $muted-foreground;
  }

  &__user-name {
    display: none;
    font-size: $text-sm;
    font-weight: 500;

    @include md {
      display: inline-block;
    }
  }

  &__auth-buttons {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__icon-btn {
    display: inline-flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border-radius: $radius-md;
    border: 1px solid $input;
    background-color: $background;
    padding: 0;
    font-size: $text-sm;
    font-weight: 500;
    box-shadow: $shadow-sm;
    transition: $transition-base;
    cursor: pointer;

    &:hover {
      background-color: $accent;
      color: $accent-foreground;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 1px $ring;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__icon {
    height: 1rem;
    width: 1rem;
  }

  &__theme-toggle {
    margin-left: $spacing-sm;
    position: relative;
  }

  &__sun {
    height: 1.2rem;
    width: 1.2rem;
    rotate: 0deg;
    scale: 1;
    transition: all 0.3s ease;

    :global(.dark) & {
      rotate: -90deg;
      scale: 0;
    }
  }

  &__moon {
    position: absolute;
    height: 1.2rem;
    width: 1.2rem;
    rotate: 90deg;
    scale: 0;
    transition: all 0.3s ease;

    :global(.dark) & {
      rotate: 0deg;
      scale: 1;
    }
  }

  &__main {
    flex: 1;
    max-width: 1536px;
    width: 100%;
    margin: 0 auto;
    padding: $spacing-lg $spacing-md;

    @include md {
      padding: 2.5rem $spacing-md;
    }
  }

  &__footer {
    padding: $spacing-lg 0;

    @include md {
      padding: 0;
    }
  }

  &__footer-content {
    max-width: 1536px;
    margin: 0 auto;
    padding: 0 $spacing-md;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-md;

    @include md {
      height: 6rem;
      flex-direction: row;
    }
  }

  &__footer-text {
    text-align: center;
    font-size: $text-sm;
    line-height: 1.75;
    color: $muted-foreground;

    @include md {
      text-align: left;
    }
  }

  &__footer-link {
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
