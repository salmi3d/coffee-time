import Vue from 'nativescript-vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  cafes: [],
  activeCafe: '',
  _cafes: [
    {
      "id": "99960bd9-5797-4926-beea-9888eefd8123",
      "name": "ODC IT",
      "address": "Strada 25 Octombrie 118, Tiraspol",
      "coordinates": "46.836523, 29.628577",
      "description": "Общественно-Деловой Центр",
      "images": "https://pmr.md/images/firm/foto/d0/d03ce518.jpg"
    },
    {
      "id": "99960bd9-5797-4926-beea-9888eefd8124",
      "name": "ODC IT",
      "address": "Strada 25 Octombrie 118, Tiraspol",
      "coordinates": "46.836523, 29.628577",
      "description": "Общественно-Деловой Центр",
      "images": "https://pmr.md/images/firm/foto/d0/d03ce518.jpg"
    },
    {
      "id": "99960bd9-5797-4926-beea-9888eefd8125",
      "name": "ODC IT",
      "address": "Strada 25 Octombrie 118, Tiraspol",
      "coordinates": "46.836523, 29.628577",
      "description": "Общественно-Деловой Центр",
      "images": "https://pmr.md/images/firm/foto/d0/d03ce518.jpg"
    },
    {
      "id": "99960bd9-5797-4926-beea-9888eefd8126",
      "name": "ODC IT",
      "address": "Strada 25 Octombrie 118, Tiraspol",
      "coordinates": "46.836523, 29.628577",
      "description": "Общественно-Деловой Центр",
      "images": "https://pmr.md/images/firm/foto/d0/d03ce518.jpg"
    },
    {
      "id": "99960bd9-5797-4926-beea-9888eefd8127",
      "name": "ODC IT",
      "address": "Strada 25 Octombrie 118, Tiraspol",
      "coordinates": "46.836523, 29.628577",
      "description": "Общественно-Деловой Центр",
      "images": "https://pmr.md/images/firm/foto/d0/d03ce518.jpg"
    }
  ],
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
    state.cafes = state._cafes
  },
  setActiveCafe: (state, id) => {
    state.activeCafe = id;
  },
}

const actions = {
  fetchCafes({ commit }) {
    Vue.axios
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
