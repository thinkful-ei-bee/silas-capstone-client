import React from 'react'
import ApiServices from '../services/api-service'
import history from '../history'
import { Link } from 'react-router-dom'

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
      console.log(history.location.pathname)
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

        <h2>Login to Quoter</h2>      

        <form id='login-form' onSubmit={event => this.handleSubmitJwtAuth(event)}>
          
          <div role='alert'>
            {error && <p className='red error'>{error}</p>}
          </div>

          <label htmlFor='loginUsername'>Username</label>
          <input type='text' id='loginUsername' name='loginUsername'></input>

          <label htmlFor='loginPassword'>Password</label>
          <input type='password' id='loginPassword' name='loginPassword'></input>

          <button type='submit'>Submit</button>

          <div id='login-to-reg'><Link to='/register'>Don't have an account?</Link></div>
          
        </form>

      </div>

    )
  }
}