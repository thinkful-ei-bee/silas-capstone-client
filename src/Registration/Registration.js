import React from 'react'
import { Link } from 'react-router-dom'
import ApiServices from '../services/api-service'
import history from '../history'
import './Registration.css'
import './RegistrationFullScreen.css'

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
        
        <nav role='navigation'>
          <h1 className='pointer' onClick={() => this.props.history.history.push('/')}>Quoter</h1>
        </nav>

        <div className='register-main'>
          <h2>Register for an Account</h2>

          <div className='register-error error'>
            {this.props.stateError && this.props.stateError}
          </div>

          <form className='register-form' onSubmit={(event) => this.handleSubmit(event)}>

            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username'></input>

            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password'></input>

            <button className='pure-button' type='submit'>Submit</button>
          </form>

          <div className='reg-to-login'><Link to='/login'>Already have an account?</Link></div>
        </div>

      </div>
    )
  }
}