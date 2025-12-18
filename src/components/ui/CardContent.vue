<template>
  <div class="card-content">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card-content {
  padding: $spacing-lg;
  padding-top: 0;
}
</style>
