<template>
  <!-- chat container -->
  <div class="flex flex-1 flex-col w-full">
    <!-- messages container -->
    <div ref="messageContainer" class="flex flex-1 flex-col overflow-y-auto">
      <!-- messages -->
      <div
        v-for="(message, i) in messages"
        :key="message.id ?? message.index ?? i"
        :id="`${createMessageHtmlId(idPrefix, message.id ?? message.index ?? i)}`"
        class="relative flex flex-col w-full"
      >
        <slot name="message" :message="message" :index="i">
          <VChatSystemMessage v-if="message.role === 'system'" :message="message" :index="i" />
          <VChatUserMessage v-else-if="message.role === 'user'" :message="message" :index="i" />
        </slot>

        <!-- spacer -->
        <div
          v-if="lastUserMessage && message.id === lastUserMessage.id"
          class="absolute inset-0 w-full pointer-events-none"
          :style="{ minHeight: messageContainerHeight + 'px' }"
        ></div>
      </div>
    </div>
    <!-- pre-input message -->
    <slot name="pre-input-message">
      <div v-if="!messages.length" :id="`${idPrefix}-pre-input-message`" class="text-2xl font-bold py-2">
        How can I help?
      </div>
    </slot>
    <!-- input -->
    <slot name="input">
      <VChatInput v-model="userMessage" @send="send()" @focus="onFocus" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type PropType, ref, watchEffect, nextTick, watch, computed, onMounted } from 'vue'
import { useIdPrefix } from '../utils/idPrefix'
import { createMessageHtmlId } from '../utils/createMessageHtmlId'
import type { VChatMessage } from '../types/VChatMessage'
import VChatSystemMessage from './VChatSystemMessage.vue'
import VChatUserMessage from './VChatUserMessage.vue'
import VChatInput from './VChatInput.vue'

import { useId } from 'vue'
const id = useId()

const idPrefix = useIdPrefix(id)

const props = defineProps({
  messages: {
    type: Array as PropType<VChatMessage<object>[]>,
    default: () => []
  }
})

const userMessage = defineModel('userMessage', {
  type: String,
  default: ''
})

const messageContainer = ref<HTMLDivElement | null>(null)
const messageContainerHeight = ref(0)
const calcMessageContainerHeight = () => {
  messageContainerHeight.value = messageContainer.value?.getBoundingClientRect().height || 0
}

const { height: winH, width: winW } = useWindowSize()

watchEffect(() => {
  if (messageContainer.value && winH.value && winW.value && lastUserMessage.value) {
    calcMessageContainerHeight()
  }
})

const scrollToLastUserMessage = async (id?: string | number) => {
  await nextTick()

  if (id) {
    const lastUserMessageElement = document.getElementById(createMessageHtmlId(idPrefix, id))
    if (!lastUserMessageElement || !messageContainer.value) return

    // Calculate the offset of the message relative to the container
    const containerTop = messageContainer.value.getBoundingClientRect().top
    const messageTop = lastUserMessageElement.getBoundingClientRect().top
    const offset = messageTop - containerTop

    // Scroll the container to bring the message to the top
    messageContainer.value.scrollTo({
      top: messageContainer.value.scrollTop + offset,
      behavior: 'smooth'
    })
  }
}

// watch messages, and when a new user message is added, scroll to it
watch(
  () => props.messages,
  (newMessages) => {
    const lastMessage = newMessages[newMessages.length - 1]
    if (lastMessage && lastMessage.role === 'user') {
      scrollToLastUserMessage(lastMessage.id || lastMessage.index)
    }
  },
  { deep: true }
)

const lastUserMessage = computed(() => {
  return props.messages.findLast((message) => message.role === 'user')
})

// on mounted, scroll to the last user message
onMounted(() => {
  if (lastUserMessage.value) scrollToLastUserMessage(lastUserMessage.value.id || lastUserMessage.value.index)
})

const emit = defineEmits<{
  (e: 'send'): void
  (e: 'focus'): void
}>()

const send = () => emit('send')
const onFocus = () => emit('focus')
</script>
