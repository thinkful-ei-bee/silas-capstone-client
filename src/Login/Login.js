import React from 'react'
import ApiServices from '../services/api-service'
import { Link } from 'react-router-dom'
import './Login.css'
import './LoginFullScreen.css'

export default class Login extends React.Component {

  handleSubmitJwtAuth = (event) => {
    event.preventDefault()
    const { loginUsername, loginPassword } = event.target

    ApiServices.postLogin(
      loginUsername.value,
      loginPassword.value
    )
    .then(res => {
      loginUsername.value = ''
      loginPassword.value = ''
      this.props.history.push('/entry')
    })
    .then(res => {
      this.props.clearError()
      //window.location.reload()
    })
    .catch(res => {
      this.props.handleError(res)
    })
  }

  // componentDidUpdate() {
  //   this.props.updatePath(history.location.pathname)
  // }

  render() {
    const error = this.props.stateError
    return(
      <div id='login-page'>
        <nav role='navigation'>
          <h1 className='pointer' onClick={() => this.props.history.push('/')}>Quoter</h1>
        </nav>

        <div id='login-main'>
          <h2>Login to Quoter</h2>    
          <div role='alert' className='error'>
            {error && <p className='red'>{error}</p>}
          </div>
          <form id='login-form' onSubmit={event => this.handleSubmitJwtAuth(event)}>
            

            <label htmlFor='loginUsername'>Username</label>
            <input type='text' id='loginUsername' name='loginUsername'></input>

            <label htmlFor='loginPassword'>Password</label>
            <input type='password' id='loginPassword' name='loginPassword'></input>

            <button type='submit'>Submit</button>
          </form>

          <div id='login-to-reg'><Link to='/register'>Don't have an account?</Link></div>
        
        </div>  

      </div>

    )
  }
}