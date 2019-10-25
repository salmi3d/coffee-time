import BackendService from './BackendService'
import Vue from 'nativescript-vue'

export default class AuthService extends BackendService {

  async login(user) {
    try {
      const response = await Vue.axios
        .post('/User/Authorization', {
          email: user.email,
          password: user.password
        })
      Vue.prototype.$backendService.token = response.data

      return Vue.prototype.$backendService.token
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
    Vue.prototype.$backendService.token = ''
    return Vue.prototype.$navigator.navigate('/login', { clearHistory: true })
  }

}
