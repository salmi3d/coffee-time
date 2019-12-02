import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

export default {

  authUser(user) {
    return apiClient.post('/User/Authorization', {
      email: user.email,
      password: user.password
    })
  },
  registerUser(user) {
    return apiClient.post('/User/Register', {
      email: user.email,
      password: user.password
    })
  },
  getAllCafes(sessionId) {
    return apiClient.post('/Cafe/GetAll', JSON.stringify(sessionId))
  },
  getCafeProducts(sessionId, cafeId) {
    return apiClient.post('/Product/GetProductsCafe', {
      sessionId,
      cafeId
    })
  },
  switchCafeProductFavorite(sessionId, product) {
    const apiBranch = '/Favorite/' + (product.favorite ? 'Unset' : 'Set')
    return apiClient.post(apiBranch, {
      sessionId: sessionId,
      productId: product.id
    })
  },
}
