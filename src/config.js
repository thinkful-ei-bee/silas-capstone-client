require('dotenv').config()

export default {
  API_SECRET: process.env.REACT_APP_API_SECRET,
  API_ENDPOINT: 'http://localhost:8000/api',
  API_KEY: process.env.REACT_APP_API_KEY
}