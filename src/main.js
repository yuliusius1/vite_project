import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {registerSW} from 'virtual:pwa-register'

const intervalMs = 10000
const updateSW = registerSW({
    onRegistered(r) {
        r && setInterval(() => {
            r.update()
        }, intervalMs)
    }
})

registerSW({immediate : true})

createApp(App).mount('#app')
