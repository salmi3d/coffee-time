// import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import Navigator from 'nativescript-vue-navigator'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import { routes } from './routes'
import store from './store'

import BackendService from './services/BackendService'
import AuthService from './services/AuthService'

Vue.prototype.$store = store
Vue.prototype.$authService = new AuthService()
Vue.prototype.$backendService = new BackendService()

Vue.registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh)

import App from './App.vue'

Vue.use(Navigator, { routes })
// Vue.use(VueDevtools)

Vue.config.silent = (TNS_ENV !== 'development')
Vue.config.debug = (TNS_ENV === 'development')

TNSFontIcon.paths = { 'fa': './assets/font-awesome.css' }
TNSFontIcon.loadCss()
Vue.filter('fonticon', fonticon)

require('nativescript-orientation-free')

new Vue({
  store,
  render: h => h(App),
}).$start()
