import React from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='landing-page'>

        <nav role='navigation'>
          <button>Log In</button>
          <button>Sign Up</button>        
        </nav>

        <header role='heading'>
          <h1>Quoter</h1>
        </header>

        <p className='landing-page-info'>
          Watch quotes appear before your eyes as you write about anything.
        </p>

        <Link to='/entry'>Start Writing</Link>

      </div>
    )
  }
}