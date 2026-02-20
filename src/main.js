import { Buffer } from 'buffer'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// gray-matter/js-yaml use Node's Buffer; polyfill for browser
if (typeof window !== 'undefined') window.Buffer = Buffer
if (typeof globalThis !== 'undefined') globalThis.Buffer = Buffer

createApp(App).use(router).mount('#app')
