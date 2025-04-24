import VChatInput from './components/VChatInput.vue'
import VChatSystemMessage from './components/VChatSystemMessage.vue'
import VChatTextChunker from './components/VChatTextChunker.vue'
import VChatUi from './components/VChatUi.vue'
import VChatUserMessage from './components/VChatUserMessage.vue'

// types
import type { VChatMessage } from './types/VChatMessage'

export {
  VChatInput,
  VChatSystemMessage,
  VChatTextChunker,
  VChatUi,
  VChatUserMessage,
  // types
  type VChatMessage
}

// Optionally, create a plugin for Vue.use() or app.use()
import type { App } from 'vue'
export default {
  install: (app: App) => {
    app.component('VChatInput', VChatInput)
    app.component('VChatSystemMessage', VChatSystemMessage)
    app.component('VChatTextChunker', VChatTextChunker)
    app.component('VChatUi', VChatUi)
    app.component('VChatUserMessage', VChatUserMessage)
  }
}
