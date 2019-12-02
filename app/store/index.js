import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import ApiService from '../services/ApiService'

import fakeCafes from './cafes_api_example'

Vue.use(Vuex)

const state = {
  cafes: [],
  activeCafe: '',
  cafeProducts: [],
  activeCafeProduct: '',
  filterFavoriteProducts: false,
}

const getters = {
  cafe: state => {
    return state.cafes.find(cafe => cafe.id === state.activeCafe)
  },
  cafeProduct: state => {
    return state.cafeProducts.find(cafeProduct => cafeProduct.id === state.activeCafeProduct)
  },
}

const mutations = {
  SET_CAFES(state, cafes) {
    state.cafes = cafes
  },
  SET_ACTIVE_CAFE(state, id) {
    state.activeCafe = id
  },
  SET_ACTIVE_CAFE_PRODUCT(state, id) {
    state.activeCafeProduct = id
  },
  SET_CAFE_PRODUCTS(state, cafeProducts) {
    state.cafeProducts = cafeProducts
  },
  TOGGLE_FILTER_FAVORITE_PRODUCTS(state) {
    state.filterFavoriteProducts = !state.filterFavoriteProducts
  },
  TOGGLE_CAFE_PRODUCT_FAVORITE(state, cafeProductId) {
    let cafeProduct = state.cafeProducts.find(cafeProduct => cafeProduct.id === cafeProductId)
    cafeProduct.favorite = !cafeProduct.favorite
  },
}

const actions = {
  setActiveCafe({ commit }, cafeId) {
    commit('SET_ACTIVE_CAFE', cafeId)
  },
  setActiveCafeProduct({ commit }, cafeProductId) {
    commit('SET_ACTIVE_CAFE_PRODUCT', cafeProductId)
  },
  fetchCafes({ commit }, options) {
    options = options || {}

    if(options.isFake) {
      commit('SET_CAFES', fakeCafes)
      return new Promise(resolve => resolve())
    }

    return ApiService.getAllCafes(Vue.prototype.$backendService.token)
      .then(response => {
        commit('SET_CAFES', response.data)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  fetchCafeProducts({ state, commit }) {
    return ApiService.getCafeProducts(Vue.prototype.$backendService.token, state.activeCafe)
      .then(response => {
        commit('SET_CAFE_PRODUCTS', response.data)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  toggleCafeProductFavorite({ commit }, product) {
    return ApiService.switchCafeProductFavorite(Vue.prototype.$backendService.token, product)
      .then(response => {
        if(response.data === true) {
          commit('TOGGLE_CAFE_PRODUCT_FAVORITE', product.id)
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  toggleFilterFavoriteProducts({ commit }) {
    commit('TOGGLE_FILTER_FAVORITE_PRODUCTS')
  },
}

const storeConf = {
  state,
  getters,
  mutations,
  actions
}

export default new Vuex.Store(storeConf)
