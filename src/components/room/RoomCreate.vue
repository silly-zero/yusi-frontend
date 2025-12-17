<template>
  <Card class="h-full">
    <CardHeader>
      <CardTitle>创建情景室</CardTitle>
      <CardDescription>创建一个新的房间，邀请朋友一起探索。</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium leading-none">你的用户ID</label>
        <Input
          v-model="ownerId"
          placeholder="例如：alice"
          :disabled="loading"
        />
      </div>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium leading-none">最大人数</label>
          <span class="text-sm text-muted-foreground">{{ maxMembers }} 人</span>
        </div>
        <input
          v-model.number="maxMembers"
          type="range"
          min="2"
          max="8"
          class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          :disabled="loading"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button :is-loading="loading" @click="handleCreate" class="w-full">
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
