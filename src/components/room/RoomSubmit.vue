<template>
  <Card>
    <CardHeader>
      <CardTitle>写下你的叙事</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <Textarea
        v-model="narrative"
        :rows="8"
        placeholder="描述你在该情景下会采取的行动与想法..."
        :disabled="loading"
      />
      <div class="text-xs text-muted-foreground text-right">
        已输入 {{ charCount }} / 1000 字符
      </div>
    </CardContent>
    <CardFooter>
      <Button :is-loading="loading" @click="handleSubmit">
        提交叙事
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui'
import Button from '../ui/Button.vue'
import Textarea from '../ui/Textarea.vue'
import { submitNarrative } from '@/lib/room'
import { countChars } from '@/utils'

interface Props {
  code: string
  userId: string
}

const props = defineProps<Props>()

const narrative = ref('')
const loading = ref(false)

const charCount = computed(() => countChars(narrative.value))

const handleSubmit = async () => {
  if (!narrative.value.trim()) {
    alert('请输入你的叙事')
    return
  }

  if (charCount.value > 1000) {
    alert('叙事过长（>1000字符）')
    return
  }

  loading.value = true
  try {
    await submitNarrative({ code: props.code, userId: props.userId, content: narrative.value })
    alert('提交成功')
    window.location.reload()
  } catch (error) {
    console.error('Error submitting narrative:', error)
    alert('提交失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>
