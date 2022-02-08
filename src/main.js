import './assets/sass/app.scss'

import { createApp } from 'vue'

import router from '@/router'
import { store } from '@/vuex/store'

import App from "@/App";

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')