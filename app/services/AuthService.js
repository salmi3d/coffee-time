import BackendService from './BackendService'
import { backendService } from "../main"
import Vue from 'nativescript-vue'

export default class AuthService extends BackendService {

  async login(user) {

  }

  async register(user) {
    try {
      const response = await Vue.axios
        .post("/User/Register", {
          email: user.email,
          password: user.password
        })
      return JSON.stringify(response.data)
    } catch (error) {
      return Promise.reject('Unable to register')
    }
  }

  async logout() {
    backendService.token = '';
  }

}
