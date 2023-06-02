import { createApp } from 'vue'
import './style.css'

// Vuetify 
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

app.use(router)
app.use(vuetify)


app.mount('#app')
