<template>
  <Layout>
    <div v-if="!room" class="room-page__empty">
      房间不存在或已失效
    </div>
    <div v-else class="room-page">
      <div class="room-page__header">
        <h2 class="room-page__title">房间 {{ code }}</h2>
        <Badge
          :variant="
            room.status === 'WAITING' ? 'secondary' :
            room.status === 'IN_PROGRESS' ? 'default' :
            'outline'
          "
          class="room-page__status-badge"
        >
          <template v-if="room.status === 'WAITING'">等待中</template>
          <template v-else-if="room.status === 'IN_PROGRESS'">进行中</template>
          <template v-else>已完成</template>
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="room-page__members-title">成员 ({{ room.members.length }}/8)</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="room-page__members-list">
            <Badge
              v-for="m in room.members"
              :key="m"
              variant="secondary"
              class="room-page__member-badge"
            >
              {{ m }}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <RoomSubmit v-if="room.status === 'IN_PROGRESS' && !submitted" :code="code!" :user-id="userId" />

      <Card v-if="room.status === 'IN_PROGRESS' && submitted">
        <CardContent class="room-page__waiting-message">
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

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.room-page {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  max-width: 80rem;
  margin: 0 auto;

  &__empty {
    display: flex;
    height: 50vh;
    align-items: center;
    justify-content: center;
    color: $muted-foreground;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: $text-3xl;
    font-weight: bold;
    letter-spacing: -0.025em;
  }

  &__status-badge {
    font-size: $text-sm;
    padding: 0.25rem 0.75rem;
  }

  &__members-title {
    font-size: $text-lg;
  }

  &__members-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__member-badge {
    padding: 0.25rem 0.75rem;
    font-size: $text-sm;
  }

  &__waiting-message {
    padding: 2rem;
    text-align: center;
    color: $muted-foreground;
  }
}
</style>
