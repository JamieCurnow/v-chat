# VChat UI 🎉

## Made with 💚 by [Hiyield](https://hiyield.co.uk/)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

![VChat ui](https://github.com/user-attachments/assets/b843dd3a-dd46-40df-8569-b608bba81354)

VChat UI is a Vue 3 component library for building AI chat interfaces. It provides a set of customizable components to create chat UIs with ease. Whether you're building a chatbot, virtual assistant, or any conversational interface, VChat UI has you covered!

## Installation 🚀

Install the library using npm or yarn:

```bash
npm install v-chat-ui

# or

yarn add v-chat-ui
```

## Quick Start ✨

Here's how simple it is to get started with `VChatUi`:

```vue
<template>
  <VChatUi :messages="messages" v-model:userMessage="userMessage" @send="send" />
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  { role: 'system', text: 'Welcome to VChat!' },
  { role: 'user', text: 'Hello, how are you?' }
])

const userMessage = ref('')

const send = async () => {
  // hit your API
  messages.value.push({ role: 'user', text: userMessage.value })
  userMessage.value = ''
}
</script>
```

That's it! You now have a fully functional chat interface. 🎉

## Customization 🛠️

Want to make it your own? VChat UI is designed to be flexible and customizable. Here's how you can customize the slots to create a unique chat experience.

### Customizing Slots

#### VChatUi Message Slot

```vue
<template>
  <VChatUi :messages="messages" v-model:userMessage="userMessage" @send="send">
    <template #message="{ message, index }">
      <div v-if="message.role === 'user'" class="user-message"><strong>User:</strong> {{ message.text }}</div>
      <div v-else-if="message.role === 'system'" class="system-message">
        <em>System:</em> {{ message.text }}
      </div>
    </template>
  </VChatUi>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  { role: 'system', text: 'Welcome to VChat!' },
  { role: 'user', text: 'Hello, how are you?' }
])

const userMessage = ref('')

const send = () => {
  messages.value.push({ role: 'user', text: userMessage.value })
  userMessage.value = ''
}
</script>
```

#### VChatUi Pre-Input Message Slot

```vue
<template>
  <VChatUi :messages="messages" v-model:userMessage="userMessage" @send="send">
    <template #pre-input-message>
      <div class="pre-input">Ask me anything! 🤖</div>
    </template>
  </VChatUi>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])
const userMessage = ref('')

const send = () => {
  messages.value.push({ role: 'user', text: userMessage.value })
  userMessage.value = ''
}
</script>
```

#### VChatUi Input Slot

```vue
<template>
  <VChatUi :messages="messages" v-model:userMessage="userMessage" @send="send">
    <template #input>
      <div class="custom-input">
        <textarea
          v-model="userMessage"
          @keydown.enter.prevent="send"
          placeholder="Type your message..."
        ></textarea>
        <button @click="send">Send</button>
      </div>
    </template>
  </VChatUi>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([{ role: 'system', text: 'Welcome to VChat!' }])

const userMessage = ref('')

const send = () => {
  messages.value.push({ role: 'user', text: userMessage.value })
  userMessage.value = ''
}
</script>
```

## Components 📦

### VChatInput Component

A text input component for user messages.

#### Props

- `v-model` (String): Two-way binding for the input value.

#### Events

- `send`: Emitted when the user presses Enter.
- `focus`: Emitted when the input gains focus.

#### Example Usage

```vue
<VChatInput v-model="userMessage" @send="send" @focus="onFocus" />
```

### VChatSystemMessage Component

Displays system messages with optional text chunking.

#### Props

- `message` (Object): A `VChatMessage` object representing the system message.

#### Example Usage

```vue
<VChatSystemMessage :message="{ text: 'System message' }" />
```

### VChatUserMessage Component

Displays user messages.

#### Props

- `message` (Object): A `VChatMessage` object representing the user message.

#### Example Usage

```vue
<VChatUserMessage :message="{ text: 'User message' }" />
```

### VChatTextChunker Component

Animates text by displaying it in chunks with a fade-in effect.

#### Props

- `text` (String): The text to display in chunks.

#### Example Usage

```vue
<VChatTextChunker text="This is a chunked message." />
```

## Types 🛠️

### VChatMessage Type

Represents a chat message.

#### Properties

- `role` (String): The role of the sender (e.g., `user`, `system`).
- `text` (String): The message content.
- `id` (String): A unique identifier for the message.
- `index` (Number): The index of the message.
- `object` (Object): Any additional properties you want to include.

#### Example Usage

```typescript
type VChatMessage = {
  role?: 'user' | 'system' | string
  text?: string
  id?: string
  index?: number
} & obect
```

## License 📜

MIT
