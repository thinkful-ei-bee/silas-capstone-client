import React from 'react'
import { Link } from 'react-router-dom'
import ApiServices from '../services/api-service'
import history from '../history'

export default class Registration extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = event.target

    ApiServices.postUser(username.value, password.value)
      .then(user => {
        username.value=''
        password.value=''
        history.push('/entry')
      })
      .then(user => {
        this.props.clearError()
        this.props.history.history.push('/entry')
      })
      .catch(err => this.props.handleError(err))
  }

  render() {
    return (
      <div className='registration'>
        <h2>Register for an Account</h2>

        <form id='register-form' onSubmit={(event) => this.handleSubmit(event)}>

          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username'></input>

          <label htmlFor='password'>Password</label>
          <input type='text' id='password' name='password'></input>

          <button type='submit'>Submit</button>
        </form>

        <Link to='/login'>Already have an account?</Link>
      </div>
    )
  }
}