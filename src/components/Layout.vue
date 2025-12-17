<template>
  <div class="flex min-h-screen flex-col bg-background font-sans antialiased">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container-page flex h-14 max-w-screen-2xl items-center">
        <div class="mr-4 flex">
          <RouterLink to="/" class="mr-6 flex items-center space-x-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">Y</span>
            <span class="hidden font-bold sm:inline-block">Yusi · 灵魂叙事</span>
          </RouterLink>
          <nav class="flex items-center gap-6 text-sm font-medium">
            <RouterLink
              v-for="item in navItems"
              :key="item.href"
              :to="item.href"
              :class="cn(
                'transition-colors hover:text-foreground/80',
                route.path === item.href ? 'text-foreground' : 'text-foreground/60'
              )"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-2">
          <nav class="flex items-center gap-2">
            <template v-if="authStore.user">
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-2 px-2 py-1.5 rounded-full bg-secondary/50">
                  <UserIcon class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm font-medium hidden md:inline-block">
                    {{ authStore.user.userName }}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  @click="handleLogout"
                  title="退出登录"
                >
                  <LogOut class="h-4 w-4" />
                </Button>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center gap-2">
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
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background px-0 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Github class="h-4 w-4" />
              <span class="sr-only">GitHub</span>
            </a>
            <button
              @click="toggleTheme"
              class="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background px-0 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container-page py-6 md:py-10">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-6 md:px-8 md:py-0">
      <div class="container-page flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <span class="font-medium underline underline-offset-4">Yusi Team</span>. The source code is available on <span class="font-medium underline underline-offset-4">GitHub</span>.
        </p>
      </div>
    </footer>

    <!-- Chat Widget -->
    <ChatWidget v-if="authStore.user" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Moon, Sun, Github, LogOut, UserIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui'
import { cn } from '@/utils'
import ChatWidget from './ChatWidget.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  { label: '首页', href: '/' },
  { label: '情景室', href: '/room' },
  { label: 'AI知己', href: '/diary' },
]

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

const handleLogout = () => {
  authStore.logout()
  localStorage.removeItem('yusi-user-id')
  router.push('/login')
}
</script>
