import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles/global.css'
import 'devextreme/dist/css/dx.light.css'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

import { Quasar } from 'quasar'

const quasarUserOptions = {
  plugins: {}, 
  config: {
    brand: {
      primary: '#1976D2',
      secondary: '#26A69A',
      accent: '#9C27B0',
    }
  }
}

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')