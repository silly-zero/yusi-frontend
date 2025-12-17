<template>
  <button
    :class="buttonClass"
    :disabled="isLoading || disabled"
    v-bind="$attrs"
  >
    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { cn } from '@/utils'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false
})

const buttonClass = computed(() => {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-6 py-2',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  }

  return cn(base, variants[props.variant], sizes[props.size])
})
</script>
