<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { VChatMessage } from './types/VChatMessage'
import VChatUi from './components/VChatUi.vue'
import VChatTextChunker from './components/VChatTextChunker.vue'
import VChatInput from './components/VChatInput.vue'
import VChatUserMessage from './components/VChatUserMessage.vue'
import VChatSystemMessage from './components/VChatSystemMessage.vue'

const userMessage = ref('')
const messages = reactive<VChatMessage[]>([])

const height = ref('h-[300px]')
const onFocus = () => (height.value = 'h-[100dvh]')

const systemResponseExamples = [
  'This is a response from the system.',
  'Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user. Here is a long response from the system that is quite detailed and informative. It provides a lot of information and is meant to be very helpful to the user.'
]

const send = async () => {
  const m = userMessage.value
  userMessage.value = ''
  messages.push({ role: 'user', text: m, id: crypto.randomUUID() })

  // simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // set up the message obj
  // add it to the messages
  messages.push({ role: 'system' as const, text: '', id: crypto.randomUUID() })

  // simulate a response
  const res = systemResponseExamples[Math.floor(Math.random() * systemResponseExamples.length)]
  // chunk it into "tokens"
  const tokens = res.match(/.{1,30}/g) || []

  // for each token, add it to the message and then await a timeout of 100ms
  for (const token of tokens) {
    messages[messages.length - 1].text += token
    // await a timeout of 100ms
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}
</script>

<template>
  <div>
    <!-- normal basic use test -->
    <div class="max-h-[50dvh] h-[50dvh] flex p-10 m-10 border rounded-xl">
      <VChatUi :messages="messages" v-model:user-message="userMessage" @send="send" />
    </div>

    <!-- dynamic height test -->
    <div
      class="flex flex-col w-full max-w-7xl mx-auto bg-black p-10 transition-all duration-700 ease-out"
      :class="height"
    >
      <div class="bg-white rounded-xl w-full h-full p-4 flex">
        <!-- chat container -->
        <VChatUi :messages="messages" v-model:user-message="userMessage" @send="send" @focus="onFocus" />
      </div>
    </div>

    <!-- slots test -->
    <div class="max-h-[50dvh] h-[50dvh] flex p-10 m-10 border rounded-xl">
      <VChatUi :messages="messages">
        <template #message="{ message, index }">
          <div
            v-if="message.role === 'user'"
            class="bg-blue-500 text-white p-2 rounded-lg mb-2 self-start w-2/3"
          >
            {{ index }}: {{ message.text }}
          </div>
          <div
            v-if="message.role === 'system'"
            class="bg-red-800 text-white p-2 rounded-lg mb-2 self-end w-2/3"
          >
            <VChatTextChunker :text="`${index}: ${message.text}`" />
          </div>
        </template>

        <template #pre-input-message>
          <div v-if="!messages.length" class="text-2xl font-bold py-2">Chat to me...</div>
        </template>

        <template #input>
          <div class="flex items-center py-2">
            <textarea
              v-model="userMessage"
              class="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Type your message here..."
              rows="1"
              @keydown.enter.prevent="send"
            ></textarea>
            <button @click="send" class="bg-blue-500 text-white rounded-lg p-2 ml-2">Send</button>
          </div>
        </template>
      </VChatUi>
    </div>

    <!-- Slots with components test -->
    <div class="max-h-[50dvh] h-[50dvh] flex p-10 m-10 border rounded-xl">
      <VChatUi :messages="messages">
        <template #message="{ message }">
          <VChatUserMessage :message="message" v-if="message.role === 'user'" />
          <VChatSystemMessage :message="message" v-if="message.role === 'system'" />
        </template>

        <template #input>
          <VChatInput v-model="userMessage" @send="send" />
        </template>
      </VChatUi>
    </div>
  </div>
</template>
