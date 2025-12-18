<template>
  <input
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.input {
  display: flex;
  width: 100%;
  height: 2.5rem;
  border-radius: $radius-xl;
  border: 1px solid $input;
  background-color: $background;
  padding: $spacing-sm 0.75rem;
  font-size: $text-sm;
  transition: $transition-base;

  &::placeholder {
    color: $muted-foreground;
  }

  &:focus-visible {
    outline: none;
    border-color: $ring;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 20%, transparent);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: $text-sm;
    font-weight: 500;
  }
}
</style>
