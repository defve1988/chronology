import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import store from './store'
import my_component from './components/index'

import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(store)
  .use(my_component)
  .mount('#app')
