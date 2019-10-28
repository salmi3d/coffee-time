import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import CafePage from '../components/CafePage'

export const routes = {
  '/home': {
    component: HomePage,
    meta: { needsAuth: true }
  },
  '/login': {
    component: LoginPage,
    meta: { needsAuth: false }
  },
  '/cafe': {
    component: CafePage,
    meta: { needsAuth: true }
  },
}
