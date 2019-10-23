import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'

export const routes = {
  '/home': {
    component: HomePage,
    meta: { needsAuth: true }
  },
  '/login': {
    component: LoginPage,
    meta: { needsAuth: false }
  },
}
