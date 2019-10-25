import BackendService from './BackendService'
import { backendService } from '../main'
import Vue from 'nativescript-vue'

export default class AuthService extends BackendService {

  async login(user) {
    try {
      const response = await Vue.axios
        .post('/User/Authorization', {
          email: user.email,
          password: user.password
        })
      backendService.token = JSON.stringify(response.data)

      return backendService.token
    } catch (error) {
      return Promise.reject('Unfortunately we could not find your account.')
    }
  }

  async register(user) {
    try {
      const response = await Vue.axios
        .post('/User/Register', {
          email: user.email,
          password: user.password
        })

      return JSON.stringify(response.data)
    } catch (error) {
      return Promise.reject('Unable to register.')
    }
  }

  async logout() {
    backendService.token = ''
    return Vue.prototype.$navigator.navigate('/login', { clearHistory: true })
  }

}
