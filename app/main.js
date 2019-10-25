// import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import Navigator from 'nativescript-vue-navigator'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import { routes } from './routes'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import BackendService from './services/BackendService'
import AuthService from './services/AuthService'

export const backendService = new BackendService()
export const authService = new AuthService()

Vue.prototype.$store = store
Vue.prototype.$authService = authService

import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.use(Navigator, { routes })
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
// Vue.use(VueDevtools)

Vue.config.silent = (TNS_ENV !== 'development')
Vue.config.debug = (TNS_ENV === 'development')

TNSFontIcon.paths = { 'fa': './assets/font-awesome.css' }
TNSFontIcon.loadCss()
Vue.filter('fonticon', fonticon)

new Vue({
  store,
  render: h => h(App),
}).$start()
