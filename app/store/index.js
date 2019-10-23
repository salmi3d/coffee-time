import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: null,
  cafes: [],
}

const getters = {

}

const mutations = {

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
