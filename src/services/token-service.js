import jwtDecode from 'jwt-decode'
import config from '../config'

let _timeoutId
const tenSeconds = 10000

const TokenService = {

  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },

  clearAuthToken() {
    console.info('clearing the auth token')
    window.localStorage.removeItem(config.TOKEN_KEY)
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },

  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`)
  },

  parseJwt(jwt) {
    return jwtDecode(jwt)
  },

  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },

  _getMsUntilExpirty(payload) {
    return (payload.exp * 1000) - Date.now()
  },

  queueCallbackBeforeExpiry(callback) {
    // Get the number of ms from now until the token expires
    const msUntiExpiry = TokenService._getMsUntilExpirty(
      TokenService.readJwtToken()
    )

    _timeoutId = setTimeout(callback, msUntiExpiry - tenSeconds)
  },

  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  }
}

export default TokenService