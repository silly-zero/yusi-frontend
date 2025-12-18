<template>
  <Card class="room-report">
    <CardHeader>
      <CardTitle>情景分析报告</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="room-report__content">
        <div class="room-report__tabs">
          <button
            @click="activeTab = 'personal'"
            class="room-report__tab"
            :class="{ 'room-report__tab--active': activeTab === 'personal' }"
          >
            个人速写
          </button>
          <button
            @click="activeTab = 'pairs'"
            class="room-report__tab"
            :class="{ 'room-report__tab--active': activeTab === 'pairs' }"
          >
            合拍度矩阵
          </button>
        </div>

        <div v-if="activeTab === 'personal'" class="room-report__panel">
          <div
            v-for="p in personal"
            :key="p.userId"
            class="room-report__personal-item"
          >
            <div class="room-report__personal-header">
              <Badge variant="secondary">{{ p.userId }}</Badge>
            </div>
            <p class="room-report__sketch-text">{{ p.sketch }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'pairs'" class="room-report__panel">
          <div
            v-for="pair in pairs"
            :key="`${pair.userA}-${pair.userB}`"
            class="room-report__pair-item"
          >
            <div class="room-report__pair-header">
              <span class="room-report__pair-names">
                {{ pair.userA }} <span class="room-report__pair-arrow">↔</span> {{ pair.userB }}
              </span>
              <Badge variant="outline" class="room-report__pair-score">{{ pair.score }} 分</Badge>
            </div>
            <p class="room-report__pair-reason">{{ pair.reason }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../ui'
import type { PersonalSketch, PairCompatibility } from '@/lib/room'

interface Props {
  personal: PersonalSketch[]
  pairs: PairCompatibility[]
}

defineProps<Props>()

const activeTab = ref<'personal' | 'pairs'>('personal')
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.room-report {
  width: 100%;

  &__content {
    width: 100%;
  }

  &__tabs {
    display: flex;
    width: 100%;
    border-radius: $radius-lg;
    background-color: $secondary;
    padding: 0.25rem;
    color: $muted-foreground;
    margin-bottom: $spacing-lg;
  }

  &__tab {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: $radius-md;
    padding: 0.375rem 0.75rem;
    font-size: $text-sm;
    font-weight: 500;
    transition: $transition-base;
    background: transparent;
    border: none;
    cursor: pointer;

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px $ring;
    }

    &--active {
      background-color: $background;
      color: $foreground;
      box-shadow: $shadow-sm;
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__personal-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: $radius-lg;
    border: 1px solid $border;
    padding: $spacing-md;
    background-color: color-mix(in srgb, var(--muted) 50%, transparent);
  }

  &__personal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__sketch-text {
    font-size: $text-sm;
    color: $muted-foreground;
    line-height: 1.6;
  }

  &__pair-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: $radius-lg;
    border: 1px solid $border;
    padding: $spacing-md;
    background-color: color-mix(in srgb, var(--muted) 50%, transparent);
  }

  &__pair-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__pair-names {
    font-size: $text-sm;
    font-weight: 600;
  }

  &__pair-arrow {
    color: $muted-foreground;
    margin: 0 0.25rem;
  }

  &__pair-score {
    font-family: monospace;
  }

  &__pair-reason {
    font-size: $text-sm;
    color: $muted-foreground;
    line-height: 1.6;
  }
}
</style>
