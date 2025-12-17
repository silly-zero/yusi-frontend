<template>
  <Layout>
    <div class="space-y-12">
      <section class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
          把灵魂放进情景，更懂彼此
        </h2>
        <p class="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl sm:leading-8">
          创建一个情景室或加入朋友的房间，一起用叙事探索真实自我与关系合拍度。
        </p>
      </section>

      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
