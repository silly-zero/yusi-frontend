<template>
  <h3 class="card-title">
    <slot />
  </h3>
</template>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.card-title {
  font-size: $text-2xl;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
}
</style>
