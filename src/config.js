//  Local Server: http://localhost:8000
//  Zeit Server: https://fast-headland-56658.herokuapp.com

require('dotenv').config()

export default {
  API_ENDPOINT: 'http://localhost:8000',
  TOKEN_KEY: 'quoter-token',
  API_SECRET: process.env.REACT_APP_API_SECRET,
  API_KEY: process.env.REACT_APP_API_KEY
}