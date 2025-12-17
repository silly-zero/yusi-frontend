<template>
  <Layout>
    <div v-if="!room" class="flex h-[50vh] items-center justify-center text-muted-foreground">
      房间不存在或已失效
    </div>
    <div v-else class="space-y-6 max-w-5xl mx-auto">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold tracking-tight">房间 {{ code }}</h2>
        <Badge
          :variant="
            room.status === 'WAITING' ? 'secondary' :
            room.status === 'IN_PROGRESS' ? 'default' :
            'outline'
          "
          class="text-sm px-3 py-1"
        >
          <template v-if="room.status === 'WAITING'">等待中</template>
          <template v-else-if="room.status === 'IN_PROGRESS'">进行中</template>
          <template v-else>已完成</template>
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="text-lg">成员 ({{ room.members.length }}/8)</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex gap-2 flex-wrap">
            <Badge
              v-for="m in room.members"
              :key="m"
              variant="secondary"
              class="px-3 py-1 text-sm"
            >
              {{ m }}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <RoomSubmit v-if="room.status === 'IN_PROGRESS' && !submitted" :code="code!" :user-id="userId" />

      <Card v-if="room.status === 'IN_PROGRESS' && submitted">
        <CardContent class="p-8 text-center text-muted-foreground">
          你已提交，等待其他成员...
        </CardContent>
      </Card>

      <RoomReport
        v-if="room.status === 'COMPLETED' && report"
        :personal="report.personal"
        :pairs="report.pairs"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { RoomSubmit, RoomReport } from '@/components/room'
import { getReport } from '@/lib'
import { useRoomStore } from '@/stores'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import type { PersonalSketch, PairCompatibility } from '@/lib'

const route = useRoute()
const roomStore = useRoomStore()

const code = computed(() => route.params.code as string)
const room = computed(() => roomStore.rooms[code.value])
const userId = ref(localStorage.getItem('yusi-user-id') || '')
const submitted = computed(() => room.value?.submissions?.[userId.value])
const report = ref<{ personal: PersonalSketch[]; pairs: PairCompatibility[] } | null>(null)

const fetchReport = async () => {
  if (!code.value) return
  if (room.value?.status === 'COMPLETED') {
    const r = await getReport(code.value)
    report.value = { personal: r.personal, pairs: r.pairs }
  }
}

onMounted(() => {
  fetchReport()
})

watch(() => room.value?.status, () => {
  fetchReport()
})
</script>
