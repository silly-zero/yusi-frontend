<template>
  <Card class="room-join">
    <CardHeader>
      <CardTitle>加入情景室</CardTitle>
      <CardDescription>输入邀请码，加入朋友的房间。</CardDescription>
    </CardHeader>
    <CardContent class="room-join__content">
      <div class="room-join__field">
        <label class="room-join__label">邀请码（6位）</label>
        <Input
          v-model="code"
          placeholder="ABC123"
          maxlength="6"
          :disabled="loading"
          @input="handleCodeInput"
        />
      </div>
      <div class="room-join__field">
        <label class="room-join__label">你的用户ID</label>
        <Input
          v-model="userId"
          placeholder="例如：bob"
          :disabled="loading"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button :is-loading="loading" @click="handleJoin" class="room-join__submit-btn" variant="secondary">
        加入房间
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
import { joinRoom } from '@/lib/room'

const router = useRouter()

const code = ref('')
const userId = ref('')
const loading = ref(false)

const handleCodeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  code.value = target.value.toUpperCase()
}

const handleJoin = async () => {
  if (!code.value.trim() || !userId.value.trim()) {
    alert('请完整填写')
    return
  }

  loading.value = true
  try {
    await joinRoom({ code: code.value.toUpperCase(), userId: userId.value })
    alert('加入成功')
    router.push(`/room/${code.value.toUpperCase()}`)
  } catch (error) {
    console.error('Error joining room:', error)
    alert('加入房间失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.room-join {
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

  &__label {
    font-size: $text-sm;
    font-weight: 500;
    line-height: 1;
  }

  &__submit-btn {
    width: 100%;
  }
}
</style>
