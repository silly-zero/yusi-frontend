<template>
  <div class="badge" :class="`badge--${variant}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: $radius-full;
  border: 1px solid transparent;
  padding: 0.125rem 0.625rem;
  font-size: $text-xs;
  font-weight: 600;
  transition: $transition-base;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px $ring, 0 0 0 4px color-mix(in srgb, var(--ring) 20%, transparent);
  }

  &--default {
    background-color: $primary;
    color: $primary-foreground;

    &:hover {
      background-color: color-mix(in srgb, var(--primary) 80%, transparent);
    }
  }

  &--secondary {
    background-color: $secondary;
    color: $secondary-foreground;

    &:hover {
      background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
    }
  }

  &--destructive {
    background-color: $destructive;
    color: $destructive-foreground;

    &:hover {
      background-color: color-mix(in srgb, var(--destructive) 80%, transparent);
    }
  }

  &--outline {
    border-color: $border;
    color: $foreground;
    background-color: transparent;
  }
}
</style>
