<template>
  <Layout>
    <div class="home-page">
      <section class="home-page__hero">
        <h2 class="home-page__title">
          把灵魂放进情景，更懂彼此
        </h2>
        <p class="home-page__description">
          创建一个情景室或加入朋友的房间，一起用叙事探索真实自我与关系合拍度。
        </p>
      </section>

      <div class="home-page__actions">
        <RoomCreate />
        <RoomJoin />
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { RoomCreate, RoomJoin } from '@/components/room'
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;
@use '@/styles/utils/mixins' as *;

.home-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__hero {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__title {
    font-size: $text-3xl;
    font-weight: bold;
    letter-spacing: -0.025em;
    background: linear-gradient(to right, #111827, #4b5563);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    :global(.dark) & {
      background: linear-gradient(to right, #ffffff, #9ca3af);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @include md {
      font-size: $text-5xl;
    }
  }

  &__description {
    max-width: 42rem;
    margin: 0 auto;
    color: $muted-foreground;

    @include sm {
      font-size: $text-xl;
      line-height: 2;
    }
  }

  &__actions {
    display: grid;
    gap: $spacing-lg;
    max-width: 56rem;
    margin: 0 auto;
    width: 100%;

    @include md {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
