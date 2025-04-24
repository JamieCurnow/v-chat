<template>
  <div class="bg-gray-100 max-w-1/2 rounded-xl self-end p-3 whitespace-pre-wrap">
    <span>
      {{ message.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import type { VChatMessage } from '../types/VChatMessage'

defineProps({
  message: {
    type: Object as PropType<VChatMessage>,
    required: true
  }
})
</script>
