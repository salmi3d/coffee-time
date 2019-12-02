import BackendService from './BackendService'
import ApiService from './ApiService'
import Vue from 'nativescript-vue'

export default class AuthService extends BackendService {

  async login(user) {
    try {
      const response = await ApiService.authUser(user)
      Vue.prototype.$backendService.token = response.data
      return Vue.prototype.$backendService.token
    } catch (error) {
      throw new Error(error)
    }
  }

  async register(user) {
    try {
      const response = await ApiService.registerUser(user)
      return JSON.stringify(response.data)
    } catch (error) {
      throw new Error(error)
    }
  }

  async logout() {
    Vue.prototype.$backendService.token = ''
    return Vue.prototype.$navigator.navigate('/login', { clearHistory: true })
  }

}
