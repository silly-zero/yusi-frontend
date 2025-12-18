<template>
  <div class="card-footer">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card-footer {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  padding-top: 0;
}
</style>
