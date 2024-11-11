import { createApp } from 'vue'
import App from './App.vue'
import { calculate } from './store/formule'

createApp(App).mount('#light-calc-app')
calculate();