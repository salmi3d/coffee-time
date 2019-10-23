import BackendService from './BackendService'
import { backendService } from "../main";

export default class AuthService extends BackendService {

  async login(user) {

  }

  async register(user) {

  }

  async logout() {
    backendService.token = '';
  }

}
