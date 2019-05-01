import config from '../config'

export default {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
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

  getQuoteBySubject(subject) {
    return fetch(`http://quotes.rest/quote/search.json?category=${subject}`, {
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