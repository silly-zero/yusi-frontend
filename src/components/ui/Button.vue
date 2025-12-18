<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
    :disabled="isLoading || disabled"
    v-bind="$attrs"
  >
    <Loader2 v-if="isLoading" class="btn__loader" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false
})
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: $radius-full;
  font-weight: 500;
  transition: $transition-base;
  cursor: pointer;
  border: none;
  outline: none;

  &:focus-visible {
    outline: 2px solid $ring;
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &__loader {
    margin-right: $spacing-sm;
    width: 1rem;
    height: 1rem;
    animation: spin 1s linear infinite;
  }

  &--primary {
    background-color: $primary;
    color: $primary-foreground;
    box-shadow: $shadow-sm;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--primary) 90%, transparent);
    }
  }

  &--secondary {
    background-color: $secondary;
    color: $secondary-foreground;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
    }
  }

  &--danger {
    background-color: $destructive;
    color: $destructive-foreground;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--destructive) 90%, transparent);
    }
  }

  &--ghost {
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: $accent;
      color: $accent-foreground;
    }
  }

  &--outline {
    border: 1px solid $input;
    background-color: $background;

    &:hover:not(:disabled) {
      background-color: $accent;
      color: $accent-foreground;
    }
  }

  &--sm {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: $text-xs;
  }

  &--md {
    height: 2.5rem;
    padding: $spacing-sm $spacing-lg;
  }

  &--lg {
    height: 3rem;
    padding: 0 2rem;
    font-size: $text-lg;
  }

  &--icon {
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
