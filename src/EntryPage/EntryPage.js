import React from 'react'
import './EntryPage.css'
import './EntryPageFullScreen.css'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import ApiService from '../services/api-service'
import UserEntryList from '../UserEntryList/UserEntryList'
import Nav from '../Nav/Nav'
import QuoterContext from '../context/quoter-context'

export default class EntryPage extends React.Component {
  static contextType = QuoterContext;

  handleLogout() {
    TokenService.clearAuthToken()
    this.context.resetState()
    this.context.clearError()
    this.props.history.push('/')
  }

  handleSaveEntry = (event) => {
    event.preventDefault()
    const { 
      toggleSave, updateUserEntries, handleError,
      currentEntry, currentTitle, clearError
    } = this.context

    const content = event.target.entryText.value
    const title = event.target.title.value

    const entry = { title, content }

    if (!currentEntry) {
      handleError({ error: 'Sorry, we can\'t save empty documents.' })
      setTimeout(() => {
        clearError()
      }, 5000)
      return
    }

    if (!currentTitle) {
      handleError({ error:'Please add a title.' })
      setTimeout(() => {
        clearError()
      }, 5000)
      return
    }

    // Send the entry to the server
    if(TokenService.getAuthToken()) {
      toggleSave()
      clearError()


      ApiService.postEntry(entry)
        .then(() => {
          ApiService.getUserEntries()
          .then(entries => {
            toggleSave()
            updateUserEntries(entries)
          })
          .catch(err => handleError(err))        
        })
        .catch(err => handleError(err))
    }
  }

  handleGetEntry = (entryId) => {
    ApiService.getEntryById(entryId)
      .then(entry => {
        this.context.updateEntry(entry.content)
        this.context.updateTitle(entry.title)
      })
  }

  render() {
    let toggle = this.context.saveToggle

    const { 
      updateEntry, currentEntry, currentTitle,
      userEntries, updateUserEntries, updateTitle,
      quotes, error,
    } = this.context

    return (
      <div className='entry-page'>
        <div className="main-wrap">

            <input id="slide-sidebar" type="checkbox" defaultChecked='true' role="button" />
                <label htmlFor="slide-sidebar"><span>&#9776;</span></label>
            <div className="sidebar">
              <h2>My Journals</h2>
              <UserEntryList 
                userEntries={userEntries}
                updateUserEntries={updateUserEntries}
                updateEntry={updateEntry}
                updateTitle={updateTitle}
                handleGetEntry={this.handleGetEntry}
              />
              {!TokenService.getAuthToken() && 
              <div className='sidebar-signup-info'>
                <p>Sign up to save your entries. It's free!</p>
                <Link to='/register'>Sign Up</Link>
                <Link to='/login'>Login</Link>
              </div>}
              {TokenService.getAuthToken() && <button className='logout' onClick={() => this.handleLogout()}>Logout</button>}
            </div>

            <div className="portfolio">
              <nav>
                <Nav history={this.props.history} />
              </nav>

              <div className='portfolio-main'>
              <section className='quotes-area'>
                <div className='big-Q'>Q</div>
                <div className='quotebox'>
                  <p className='quote-paragraph'>{
                    quotes && quotes.length > 0 &&
                    quotes[quotes.length - 1].quote
                  }</p>
                  <div className='quote-author'>
                  
                  {
                    quotes && quotes.length > 0 && 
                    !quotes[quotes.length - 1].author &&
                    '- Unknown Author'
                  }
                  
                  {
                    quotes && quotes.length > 0 &&
                    !!quotes[quotes.length - 1].author &&
                    '- ' + quotes[quotes.length - 1].author
                  }

                  </div>
                </div>
              </section>

              <div className='error entry-error'>{error}</div>

              <section className='entry-area'>
                <form className='entry_form' onSubmit={(event) => this.handleSaveEntry(event)}>
                  <input 
                    id='title' 
                    name='title' 
                    defaultValue={currentTitle}
                    onChange={(event) => updateTitle(event.target.value)}
                    placeholder='Title'></input>
                  <textarea 
                    placeholder='Type anything...'
                    id='entryText' 
                    name='entryText' 
                    value={currentEntry}
                    onChange={(event) => updateEntry(event.target.value)}>
                  </textarea>
                  <button type='submit' className='save_button' disabled={!toggle}>Save</button>
                </form>  
              </section>            
              </div>
            </div>
        </div>        
      </div>
    )
  }
}