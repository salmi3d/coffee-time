import Vue from 'nativescript-vue'
import Vuex from 'vuex'

import fakeCafes from './cafes_api_example'

Vue.use(Vuex)

const state = {
  token: '',
  cafes: [],
  activeCafe: '',
}

const getters = {
  cafe: state => {
    return state.cafes.find(cafe => cafe.id === state.activeCafe)
  },
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setCafes: (state, cafes) => {
    state.cafes = cafes
  },
  setActiveCafe: (state, id) => {
    state.activeCafe = id;
  },
}

const actions = {
  fetchCafes({ commit }, options) {
    options = options || {}

    if(options.isFake) {
      commit('setCafes', fakeCafes)
      return new Promise(resolve => resolve())
    }

    return Vue.axios
      .post('/Cafe/GetAll', JSON.stringify(Vue.prototype.$backendService.token))
      .then(response => {
        commit('setCafes', response.data)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
}

const storeConf = {
  state,
  getters,
  mutations,
  actions
}

export default new Vuex.Store(storeConf)
