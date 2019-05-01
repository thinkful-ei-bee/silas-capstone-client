import React from 'react'
import { Link } from 'react-router-dom'
import ApiServices from '../services/api-services'

export default class Registration extends React.Component {

  render() {
    return (
      <div className='registration'>

        <h2>Register for an Account</h2>

        <form id='register-form' onSubmit={(event) => {
          event.preventDefault()
          console.log(event.target.username.value)
          ApiServices.postUser(event.target.username.value, event.target.password.value)
        }}>

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