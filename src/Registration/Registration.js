import React from 'react'
import { Link } from 'react-router-dom'
import ApiServices from '../services/api-service'
import history from '../history'
import './Registration.css'
import './RegistrationFullScreen.css'
import QuoterContext from '../context/quoter-context'

export default class Registration extends React.Component {
  static contextType = QuoterContext

  handleSubmit = (event) => {
    event.preventDefault()
    //const { username, password } = event.target
    const { clearError, handleError, username, 
      password, clearCreds } = this.context

    ApiServices.postUser(username, password)
      .then(user => {
        clearCreds()
        history.push('/entry')
      })
      .then(user => {
        clearError()
        this.props.history.push('/entry')
      })
      .catch(err => handleError(err))
  }

  componentDidMount() {
    const { clearError } = this.context
    clearError()
  }

  render() {
    const { error, updateUsername, updatePassword, } = this.context
    return (
      <div className='registration'>
        
        <nav role='navigation'>
          <h1 className='pointer' onClick={() => this.props.history.push('/')}>Quoter</h1>
        </nav>

        <div className='register-main'>
          <h2>Register for an Account</h2>
          <p>Sign up to save your journal entries. It's free!</p>

          <div className='register-error error'>
            {error && error}
          </div>

          <form className='register-form' onSubmit={(event) => this.handleSubmit(event)}>

            <label htmlFor='username'>Username</label>
            <input 
              type='text' 
              id='username' 
              name='username'
              onChange={(event) => updateUsername(event.target.value)} ></input>

            <label htmlFor='password'>Password</label>
            <input 
              type='password' 
              id='password' 
              name='password'
              onChange={(event) => updatePassword(event.target.value)} ></input>

            <button className='pure-button' type='submit'>Submit</button>
          </form>

          <div className='reg-to-login'><Link to='/login'>Already have an account?</Link></div>
        </div>

      </div>
    )
  }
}