import config from '../config'

export default {
  postUser(username, password) {

    const user = { username, password }

    console.log(user)

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