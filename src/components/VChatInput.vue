<template>
  <div class="bg-gray-100 p-3 rounded-xl flex gap-2 items-center">
    <div class="flex-1">
      <textarea
        v-model="userMessage"
        @keyup.enter="handleKeyup"
        @focus="onFocus"
        class="resize-none w-full bg-transparent border-none focus:ring-0 focus:outline-hidden"
        placeholder="Type your message here..."
      />
    </div>
    <div>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const userMessage = defineModel({ type: String, default: '' })

const emit = defineEmits(['send', 'focus'])

const handleKeyup = (e: KeyboardEvent) => {
  console.log('keyup', e)

  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('send')
  }
}

const onFocus = () => emit('focus')
</script>
