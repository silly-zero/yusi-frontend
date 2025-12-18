<template>
  <div class="diary">
    <div>
      <RouterLink to="/" class="diary__back-link">
        <ChevronLeft class="diary__back-icon" />
        返回首页
      </RouterLink>
    </div>

    <div class="diary__header">
      <h2 class="diary__title">
        AI知己 · 私密日记
      </h2>
      <p class="diary__description">端到端加密，仅你可见。</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>写日记</CardTitle>
        <CardDescription>记录你的经历、想法与感受。</CardDescription>
      </CardHeader>
      <CardContent class="diary__content">
        <div class="diary__field">
          <label class="diary__label">标题</label>
          <Input
            v-model="title"
            placeholder="给今天起个名字"
            :disabled="loading"
          />
        </div>
        <div class="diary__field">
          <label class="diary__label">内容</label>
          <Textarea
            v-model="content"
            :rows="10"
            placeholder="开始书写..."
            class="diary__textarea"
            :disabled="loading"
          />
        </div>
      </CardContent>
      <CardFooter class="diary__footer">
        <div class="diary__privacy-note">所有内容端到端加密，仅用于AI分析。</div>
        <Button :is-loading="loading" @click="handleSave" class="diary__submit-btn">
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

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;
@use '@/styles/utils/mixins' as *;

.diary {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__back-link {
    display: inline-flex;
    align-items: center;
    font-size: $text-sm;
    color: $muted-foreground;
    text-decoration: none;
    transition: $transition-base;

    &:hover {
      color: $foreground;
    }
  }

  &__back-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }

  &__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__title {
    font-size: $text-3xl;
    font-weight: bold;
    background: linear-gradient(to right, #4f46e5, #c026d3);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    :global(.dark) & {
      background: linear-gradient(to right, #818cf8, #e879f9);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @include md {
      font-size: $text-5xl;
    }
  }

  &__description {
    color: $muted-foreground;
    font-size: $text-lg;
  }

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

  &__textarea {
    resize: none;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
    justify-content: space-between;

    @include sm {
      flex-direction: row;
    }
  }

  &__privacy-note {
    font-size: $text-xs;
    color: $muted-foreground;
  }

  &__submit-btn {
    width: 100%;

    @include sm {
      width: auto;
    }
  }
}
</style>
