import Vue from 'nativescript-vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  cafes: [],
}

const getters = {

}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
}

const actions = {
  fetchCafes() {
    // eslint-disable-next-line no-console
    console.log('all cafes')
  },
}

const storeConf = {
  state,
  getters,
  mutations,
  actions
}

export default new Vuex.Store(storeConf)
