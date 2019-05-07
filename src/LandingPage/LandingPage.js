import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='landing-page'>

        <nav role='navigation'>
          <Link to='/register'>Sign Up</Link>
          <Link to='/login'>Login</Link>      
        </nav>

        <header role='heading'>
          <h1>Quoter</h1>
        </header>

        <p className='landing-page-info'>
          Watch quotes appear before your eyes as you write about anything.
        </p>

        <div id='start-writing'><Link to='/entry'>Start Writing</Link></div>

      </div>
    )
  }
}