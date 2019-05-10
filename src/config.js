require('dotenv').config()

export default {
  //http://localhost:8000
  //https://fast-headland-56658.herokuapp.com
  API_ENDPOINT: 'https://fast-headland-56658.herokuapp.com',
  TOKEN_KEY: 'quoter-token',
  API_SECRET: process.env.REACT_APP_API_SECRET,
  API_KEY: process.env.REACT_APP_API_KEY
}