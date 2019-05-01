import React from 'react'

export default class Login extends React.Component {
  render() {
    return(
      <div id='login-page'>

        <h2>Login to Quoter</h2>

        <form id='login-form'>
          
          <label for='login-username'>Username</label>
          <input type='text' id='login-username' name='login-username'></input>

          <label for='login-password'>Password</label>
          <input type='text' id='login-password' name='login-password'></input>

          <button type='submit'>Submit</button>
          
        </form>

      </div>

    )
  }
}