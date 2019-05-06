import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const ApiService = {
  postUser(username, password) {

    const user = { username, password }

    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/JSON'
      },
      body: JSON.stringify(user),
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  postLogin(username, password) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/JSON'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        ApiService.postRefreshToken()
      })
      return res
    })
  },

  postEntry(entry) {

  },

  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      TokenService.queueCallbackBeforeExpiry(() => {
        ApiService.postRefreshToken()
      })
      return res
    })
    .catch(err => {
      console.log('refresh token request error')
      console.error(err)
    })
  },

  getQuoteBySubject(subject) {
    return fetch(`https://quotes.rest/quote/search.json?category=${subject}`, {
      method: 'GET',
      headers: {
        'X-TheySaidSo-Api-Secret': config.API_SECRET
      },
    })
    .then(res => {
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },
}

export default ApiService