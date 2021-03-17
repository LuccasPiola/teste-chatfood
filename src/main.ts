import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import config from '@/config'

config()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).use(router).mount('#app')
