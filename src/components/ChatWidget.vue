<template>
  <Card class="flex flex-col h-[600px] max-w-2xl mx-auto">
    <CardHeader class="border-b">
      <CardTitle>AI 助手</CardTitle>
      <CardDescription>和 Yusi AI 聊聊你的想法</CardDescription>
    </CardHeader>

    <CardContent class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div v-if="messages.length === 0" class="flex items-center justify-center h-full text-muted-foreground">
        <p>开始对话吧...</p>
      </div>

      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[
          'flex gap-3',
          message.role === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
          v-if="message.role === 'assistant'"
          class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Bot class="w-5 h-5 text-primary" />
        </div>

        <div
          :class="[
            'max-w-[80%] rounded-lg px-4 py-2',
            message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          ]"
        >
          <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
          <span class="text-xs opacity-70 mt-1 block">
            {{ formatTime(message.timestamp) }}
          </span>
        </div>

        <div
          v-if="message.role === 'user'"
          class="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center"
        >
          <User class="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>

      <div v-if="isLoading" class="flex gap-3">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot class="w-5 h-5 text-primary" />
        </div>
        <div class="bg-muted rounded-lg px-4 py-2">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter class="border-t p-4">
      <form @submit.prevent="handleSendMessage" class="flex gap-2 w-full">
        <Input
          v-model="inputMessage"
          placeholder="输入你的消息..."
          :disabled="isLoading"
          class="flex-1"
          @keydown.enter.prevent="handleSendMessage"
        />
        <Button
          type="submit"
          :disabled="!inputMessage.trim() || isLoading"
          :is-loading="isLoading"
          size="icon"
        >
          <Send class="w-4 h-4" />
        </Button>
      </form>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { Bot, User, Send } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  userId?: string
}

const props = defineProps<Props>()

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const handleSendMessage = async () => {
  const messageText = inputMessage.value.trim()
  if (!messageText || isLoading.value) return

  const userMessage: Message = {
    role: 'user',
    content: messageText,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  inputMessage.value = ''
  scrollToBottom()

  isLoading.value = true

  try {
    const userId = props.userId || localStorage.getItem('yusi-user-id') || 'anonymous'

    const response = await fetch('/api/ai/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('yusi-token') || ''}`,
      },
      body: JSON.stringify({
        userId,
        message: messageText
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('No reader available')
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }

    messages.value.push(assistantMessage)
    isLoading.value = false

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim()

          if (data === '[DONE]') {
            break
          }

          try {
            const parsed = JSON.parse(data)
            if (parsed.content) {
              assistantMessage.content += parsed.content
              scrollToBottom()
            }
          } catch (e) {
            assistantMessage.content += data
            scrollToBottom()
          }
        } else if (line.trim() && !line.startsWith(':')) {
          assistantMessage.content += line + '\n'
          scrollToBottom()
        }
      }
    }
  } catch (error) {
    console.error('Chat error:', error)

    const errorMessage: Message = {
      role: 'assistant',
      content: '抱歉，发生了一些错误。请稍后再试。',
      timestamp: new Date()
    }

    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>
