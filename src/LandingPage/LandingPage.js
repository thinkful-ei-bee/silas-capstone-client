import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import './LandingPageFullScreen.css'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='landing-page'>

        <nav role='navigation' id='landing-nav'>
          <div id='landing-login'><Link to='/login'>Login</Link></div>  
        </nav>

        <div className='landing-page-info'>
          <h1 id='landing-header'>Quoter</h1>
          <p>Write about anything. See what the greatest minds have to say about it.</p>
        </div>

        <div className='landing-full-info'>
          <div id='landing-full-head-block' className='full-block'>
            <h1 id='full-header'>Quoter</h1>
          </div>
          <div id='landing-full-info-block' className='full-block'>
            <p>Write about anything. See what the greatest minds have to say about it.</p>
          </div>
        </div>

        <div className='sub-info'>
          <h3>Inspiration for writing, from writing</h3>
          <p>Quoter scans what you write and finds quotes to match.</p>

          <h3>A treatment for writer's block</h3>
          <p>Discover new authors as well as new perspecives.</p>
        </div>

        <div className='landing-button' id='start-writing'><Link to='/entry'>Start Writing</Link></div>
        <div className='landing-button' id='register'><Link to='/register'>Sign Up</Link></div>

      </div>
    )
  }
}