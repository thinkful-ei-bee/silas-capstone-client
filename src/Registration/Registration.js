import React from 'react'
import { Link } from 'react-router-dom'
import ApiServices from '../services/api-services'

export default class Registration extends React.Component {

  render() {
    return (
      <div className='registration'>

        <form id='register-form' onSubmit={(event) => ApiServices.postUser(event.target.value)}>

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