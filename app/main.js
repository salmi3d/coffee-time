import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import Navigator from 'nativescript-vue-navigator';
//import { isAndroid, isIOS } from "tns-core-modules/platform";
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { routes } from './routes';
import store from './store';

import BackendService from './services/BackendService';
import AuthService from './services/AuthService';

export const backendService = new BackendService()
export const authService = new AuthService()

import App from './App.vue';

Vue.use(Navigator, { routes });
Vue.use(VueDevtools);

Vue.config.silent = (TNS_ENV !== 'development');
Vue.config.debug = (TNS_ENV === 'development');

TNSFontIcon.paths = {
  'fa': './assets/font-awesome.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

new Vue({
  store,
  render: h => h(App),
}).$start();
