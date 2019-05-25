import React from 'react'
import ApiServices from '../services/api-service'
import { Link } from 'react-router-dom'
import './Login.css'
import './LoginFullScreen.css'
import QuoterContext from '../context/quoter-context'

export default class Login extends React.Component {
  static contextType = QuoterContext

  handleSubmitJwtAuth = (event) => {
    event.preventDefault()
    //const { loginUsername, loginPassword } = event.target
    const  { username, password, clearError, 
      handleError, clearCreds } = this.context

    ApiServices.postLogin(
      username,
      password,
    )
    .then(res => {
      clearCreds()
      this.props.history.push('/entry')
    })
    .then(res => {
      clearError()
    })
    .catch(res => {
      handleError(res)
    })
  }

  componentDidMount() {
    const { clearError } = this.context
    clearError()
  }

  render() {
    const { error, updateUsername, updatePassword } = this.context

    return(
      <div className='login-page'>
        <nav role='navigation'>
          <h1 className='pointer' onClick={() => this.props.history.push('/')}>Quoter</h1>
        </nav>

        <div className='login-main'>
          <h2>Login to Quoter</h2>    
          <div role='alert' className='error'>
            {error && <p className='red'>{error}</p>}
          </div>
          <form className='login-form' onSubmit={event => this.handleSubmitJwtAuth(event)}>
            

            <label htmlFor='loginUsername'>Username</label>
            <input 
              type='text' 
              id='loginUsername' 
              name='loginUsername'
              onChange={(event) => updateUsername(event.target.value)} ></input>

            <label htmlFor='loginPassword'>Password</label>
            <input 
              type='password' 
              id='loginPassword' 
              name='loginPassword'
              onChange={(event) => updatePassword(event.target.value)} ></input>

            <button type='submit'>Submit</button>
          </form>

          <div className='login-to-reg'><Link to='/register'>Don't have an account?</Link></div>
        
        </div>  

      </div>

    )
  }
}