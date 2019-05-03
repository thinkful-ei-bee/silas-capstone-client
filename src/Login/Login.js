import React from 'react'
import ApiServices from '../services/api-service'
import history from '../history'

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
      history.push('/entry')
    })
    .then(res => {
      this.props.clearError()
      window.location.reload();
    })
    .catch(res => {
      this.props.handleError(res)
    })
  }

  render() {
    const error = this.props.stateError
    return(
      <div id='login-page'>

        <h2>Login to Quoter</h2>      

        <form id='login-form' onSubmit={event => this.handleSubmitJwtAuth(event)}>
          
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>

          <label htmlFor='loginUsername'>Username</label>
          <input type='text' id='loginUsername' name='loginUsername'></input>

          <label htmlFor='loginPassword'>Password</label>
          <input type='text' id='loginPassword' name='loginPassword'></input>

          <button type='submit'>Submit</button>
          
        </form>

      </div>

    )
  }
}