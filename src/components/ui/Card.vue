<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card {
  border-radius: $radius-xl;
  border: 1px solid $border;
  background-color: $card;
  color: $card-foreground;
  box-shadow: $shadow-sm;
}
</style>
