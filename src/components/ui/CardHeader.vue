<template>
  <div class="card-header">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: $spacing-lg;
}
</style>
