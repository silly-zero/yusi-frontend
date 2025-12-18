<template>
  <Card class="chat-widget">
    <CardHeader class="chat-widget__header">
      <CardTitle>AI 助手</CardTitle>
      <CardDescription>和 Yusi AI 聊聊你的想法</CardDescription>
    </CardHeader>

    <CardContent class="chat-widget__content" ref="messagesContainer">
      <div v-if="messages.length === 0" class="chat-widget__empty">
        <p>开始对话吧...</p>
      </div>

      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat-widget__message"
        :class="{
          'chat-widget__message--user': message.role === 'user',
          'chat-widget__message--assistant': message.role === 'assistant'
        }"
      >
        <div
          v-if="message.role === 'assistant'"
          class="chat-widget__avatar chat-widget__avatar--assistant"
        >
          <Bot class="chat-widget__avatar-icon" />
        </div>

        <div
          class="chat-widget__bubble"
          :class="{
            'chat-widget__bubble--user': message.role === 'user',
            'chat-widget__bubble--assistant': message.role === 'assistant'
          }"
        >
          <p class="chat-widget__bubble-text">{{ message.content }}</p>
          <span class="chat-widget__bubble-time">
            {{ formatTime(message.timestamp) }}
          </span>
        </div>

        <div
          v-if="message.role === 'user'"
          class="chat-widget__avatar chat-widget__avatar--user"
        >
          <User class="chat-widget__avatar-icon" />
        </div>
      </div>

      <div v-if="isLoading" class="chat-widget__message chat-widget__message--assistant">
        <div class="chat-widget__avatar chat-widget__avatar--assistant">
          <Bot class="chat-widget__avatar-icon" />
        </div>
        <div class="chat-widget__bubble chat-widget__bubble--assistant">
          <div class="chat-widget__loading">
            <div class="chat-widget__loading-dot" style="animation-delay: 0ms"></div>
            <div class="chat-widget__loading-dot" style="animation-delay: 150ms"></div>
            <div class="chat-widget__loading-dot" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter class="chat-widget__footer">
      <form @submit.prevent="handleSendMessage" class="chat-widget__form">
        <Input
          v-model="inputMessage"
          placeholder="输入你的消息..."
          :disabled="isLoading"
          class="chat-widget__input"
          @keydown.enter.prevent="handleSendMessage"
        />
        <Button
          type="submit"
          :disabled="!inputMessage.trim() || isLoading"
          :is-loading="isLoading"
          size="icon"
        >
          <Send class="chat-widget__send-icon" />
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

<style scoped lang="scss">
@use '@/styles/utils/variables' as *;

.chat-widget {
  display: flex;
  flex-direction: column;
  height: 600px;
  max-width: 48rem;
  margin: 0 auto;

  &__header {
    border-bottom: 1px solid $border;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $muted-foreground;
  }

  &__message {
    display: flex;
    gap: 0.75rem;

    &--user {
      justify-content: flex-end;
    }

    &--assistant {
      justify-content: flex-start;
    }
  }

  &__avatar {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;

    &--assistant {
      background-color: color-mix(in srgb, var(--primary) 10%, transparent);
    }

    &--user {
      background-color: color-mix(in srgb, var(--secondary) 10%, transparent);
    }
  }

  &__avatar-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: $primary;
  }

  &__bubble {
    max-width: 80%;
    border-radius: $radius-lg;
    padding: 0.5rem $spacing-md;

    &--user {
      background-color: $primary;
      color: $primary-foreground;
    }

    &--assistant {
      background-color: $muted;
    }
  }

  &__bubble-text {
    font-size: $text-sm;
    white-space: pre-wrap;
  }

  &__bubble-time {
    font-size: $text-xs;
    opacity: 0.7;
    margin-top: 0.25rem;
    display: block;
  }

  &__loading {
    display: flex;
    gap: 0.25rem;
  }

  &__loading-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: color-mix(in srgb, var(--primary) 60%, transparent);
    border-radius: $radius-full;
    animation: bounce 1s infinite;
  }

  &__footer {
    border-top: 1px solid $border;
    padding: $spacing-md;
  }

  &__form {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  &__input {
    flex: 1;
  }

  &__send-icon {
    width: 1rem;
    height: 1rem;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}
</style>
