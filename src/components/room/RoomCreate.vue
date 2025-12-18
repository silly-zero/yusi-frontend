<template>
  <Card class="room-create">
    <CardHeader>
      <CardTitle>创建情景室</CardTitle>
      <CardDescription>创建一个新的房间，邀请朋友一起探索。</CardDescription>
    </CardHeader>
    <CardContent class="room-create__content">
      <div class="room-create__field">
        <label class="room-create__label">你的用户ID</label>
        <Input
          v-model="ownerId"
          placeholder="例如：alice"
          :disabled="loading"
        />
      </div>
      <div class="room-create__field">
        <div class="room-create__label-wrapper">
          <label class="room-create__label">最大人数</label>
          <span class="room-create__value">{{ maxMembers }} 人</span>
        </div>
        <input
          v-model.number="maxMembers"
          type="range"
          min="2"
          max="8"
          class="room-create__slider"
          :disabled="loading"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button :is-loading="loading" @click="handleCreate" class="room-create__submit-btn">
        创建房间
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'
import { createRoom } from '@/lib/room'

const router = useRouter()

const loading = ref(false)
const ownerId = ref('')
const maxMembers = ref(4)

const handleCreate = async () => {
  if (!ownerId.value.trim()) {
    alert('请输入用户ID')
    return
  }

  loading.value = true
  try {
    const room = await createRoom({ ownerId: ownerId.value, maxMembers: maxMembers.value })
    alert(`房间创建成功，邀请码：${room.code}`)
    router.push(`/room/${room.code}`)
  } catch (error) {
    console.error('Error creating room:', error)
    alert('创建房间失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.room-create {
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: $text-sm;
    font-weight: 500;
    line-height: 1;
  }

  &__value {
    font-size: $text-sm;
    color: $muted-foreground;
  }

  &__slider {
    width: 100%;
    height: 0.5rem;
    background-color: $secondary;
    border-radius: $radius-lg;
    appearance: none;
    cursor: pointer;
    accent-color: $primary;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 1rem;
      height: 1rem;
      border-radius: $radius-full;
      background-color: $primary;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 1rem;
      height: 1rem;
      border-radius: $radius-full;
      background-color: $primary;
      cursor: pointer;
      border: none;
    }
  }

  &__submit-btn {
    width: 100%;
  }
}
</style>
