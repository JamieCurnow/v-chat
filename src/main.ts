// playground
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import VChat from './index'

const app = createApp(App)

app.use(VChat)
app.mount('#app')
