<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <div>
      <RouterLink to="/" class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft class="w-4 h-4 mr-1" />
        返回首页
      </RouterLink>
    </div>

    <div class="text-center space-y-4">
      <h2 class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400">
        AI知己 · 私密日记
      </h2>
      <p class="text-muted-foreground text-lg">端到端加密，仅你可见。</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>写日记</CardTitle>
        <CardDescription>记录你的经历、想法与感受。</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">标题</label>
          <Input
            v-model="title"
            placeholder="给今天起个名字"
            :disabled="loading"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">内容</label>
          <Textarea
            v-model="content"
            :rows="10"
            placeholder="开始书写..."
            class="resize-none"
            :disabled="loading"
          />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="text-xs text-muted-foreground">所有内容端到端加密，仅用于AI分析。</div>
        <Button :is-loading="loading" @click="handleSave" class="w-full sm:w-auto">
          保存日记
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import Textarea from './ui/Textarea.vue'
import { diaryApi } from '@/lib/api'

const title = ref('')
const content = ref('')
const loading = ref(false)
const userId = localStorage.getItem('yusi-user-id') || ''

const handleSave = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('标题与内容不能为空')
    return
  }

  loading.value = true
  try {
    await diaryApi.create({ userId, title: title.value, content: content.value })
    alert('日记已保存')
    title.value = ''
    content.value = ''
  } catch (error) {
    console.error('Error saving diary:', error)
    alert('保存失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>
