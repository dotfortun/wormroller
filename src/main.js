import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

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
  faTag
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faArrowsUpDown,
  faArrowUp,
  faArrowDown,
  faFire,
  faSnowflake,
  faTag
)

createApp(App)
  .use(createPinia())
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
