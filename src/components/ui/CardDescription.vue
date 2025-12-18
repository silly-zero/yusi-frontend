<template>
  <p class="card-description">
    <slot />
  </p>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card-description {
  font-size: $text-sm;
  color: $muted-foreground;
}
</style>
