import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faArrowsUpDown,
  faArrowUp,
  faArrowDown,
  faFire,
  faSnowflake,
  faTag,
  faX,
  faCopy,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faArrowsUpDown,
  faArrowUp,
  faArrowDown,
  faFire,
  faSnowflake,
  faTag,
  faX,
  faCopy,
  faFloppyDisk,
)

const pinia = createPinia()
  .use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
