import { createApp } from 'vue'
import App from './App'
import router from './router/index'
import '../src/assets/style.css' //importer le fichier css

createApp(App).use(router).mount('#app')