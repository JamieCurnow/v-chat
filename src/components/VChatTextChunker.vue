<template>
  <div>
    <span v-for="(chunk, i) in chunks" :key="i" class="fade-in">{{ chunk }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const chunks = ref<string[]>([])

// watch for text changes and add the new text to the chunks
watch(
  () => props.text,
  (newText, oldText) => {
    const chunk = newText.slice(oldText?.length || 0)
    if (chunk) chunks.value.push(chunk)
  },
  { immediate: true }
)
</script>

<style scoped>
/* fade in animation */

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
  animation: fadeIn 0.5s ease-in;
}
</style>
