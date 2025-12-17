<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>情景分析报告</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="w-full">
        <div class="flex w-full rounded-lg bg-secondary p-1 text-muted-foreground mb-6">
          <button
            @click="activeTab = 'personal'"
            :class="[
              'flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              activeTab === 'personal' ? 'bg-background text-foreground shadow-sm' : ''
            ]"
          >
            个人速写
          </button>
          <button
            @click="activeTab = 'pairs'"
            :class="[
              'flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              activeTab === 'pairs' ? 'bg-background text-foreground shadow-sm' : ''
            ]"
          >
            合拍度矩阵
          </button>
        </div>

        <div v-if="activeTab === 'personal'" class="space-y-4">
          <div
            v-for="p in personal"
            :key="p.userId"
            class="flex flex-col gap-2 rounded-lg border p-4 bg-muted/50"
          >
            <div class="flex items-center gap-2">
              <Badge variant="secondary">{{ p.userId }}</Badge>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ p.sketch }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'pairs'" class="space-y-4">
          <div
            v-for="pair in pairs"
            :key="`${pair.userA}-${pair.userB}`"
            class="space-y-2 rounded-lg border p-4 bg-muted/50"
          >
            <div class="flex items-center justify-between">
              <span class="font-semibold text-sm">
                {{ pair.userA }} <span class="text-muted-foreground mx-1">↔</span> {{ pair.userB }}
              </span>
              <Badge variant="outline" class="font-mono">{{ pair.score }} 分</Badge>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ pair.reason }}</p>
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
