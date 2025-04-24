<template>
  <div>
    <div class="border-t border-gray-200 w-full my-3"></div>
    <div class="whitespace-pre-wrap">
      <VChatTextChunker :text="message.text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import type { VChatMessage } from '../types/VChatMessage'
import VChatTextChunker from './VChatTextChunker.vue'

defineProps({
  message: {
    type: Object as PropType<VChatMessage>,
    required: true
  }
})
</script>
