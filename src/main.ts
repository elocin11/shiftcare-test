import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.ts'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
