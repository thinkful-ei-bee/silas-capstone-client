import React from 'react'
import './EntryPage.css'
import './EntryPageFullScreen.css'
import TokenService from '../services/token-service'
import ApiService from '../services/api-service'
import UserEntryList from '../UserEntryList/UserEntryList'
import Nav from '../Nav/Nav'

export default class EntryPage extends React.Component {

  handleLogout() {
    TokenService.clearAuthToken()
    this.props.resetState()
    this.props.clearError()
    this.props.history.history.push('/')
  }

  handleSaveEntry = (event) => {
    event.preventDefault()
    const content = event.target.entryText.value
    const title = event.target.title.value

    const entry = { title, content }
    console.log('TRIED TO GET ENTRIES')

    // Send the entry to the server
    ApiService.postEntry(entry)
      .then(() => {
        ApiService.getUserEntries()
        .then(entries => {
          this.props.updateUserEntries(entries)
        })
        .catch(err => this.props.handleError(err))        
      })
      .catch(err => this.props.handleError(err))
  }

  handleGetEntry = (entryId) => {
    console.log(entryId)
    ApiService.getEntryById(entryId)
      .then(entry => {
        this.props.updateEntry(entry.content)
        this.props.updateTitle(entry.title)
      })
  }

  render() {
    return (
      <div className='entry-page'>
        <div className="main-wrap">

            <input id="slide-sidebar" type="checkbox" checked='unchecked' readOnly={true} role="button" />
                <label htmlFor="slide-sidebar"><span>&#9776;</span></label>
            <div className="sidebar">
              <h2>My Journals</h2>
              <UserEntryList 
                userEntries={this.props.userEntries}
                updateUserEntries={this.props.updateUserEntries}
                updateEntry={this.props.updateEntry}
                updateTitle={this.props.updateTitle}
                handleGetEntry={this.handleGetEntry}
              />
              <button id='logout' onClick={() => this.handleLogout()}>Logout</button>
            </div>

            <div className="portfolio">
              <nav>
                <Nav />
              </nav>

              <div id='portfolio-main'>
              <section id='quotes-area'>
                <div id='big-Q'>Q</div>
                <div className='quotebox'>
                  <p className='quote-paragraph'>{
                    this.props.quotes && this.props.quotes.length > 0 &&
                    this.props.quotes[this.props.quotes.length - 1].quote
                  }</p>
                  <div className='quote-author'>{
                    this.props.quotes && this.props.quotes.length > 0 &&
                    '- ' + this.props.quotes[this.props.quotes.length - 1].author
                  }</div>
                </div>
              </section>

              <section id='entry-area'>
                <form id='entry_form' onSubmit={(event) => this.handleSaveEntry(event)}>
                  <input 
                    id='title' 
                    name='title' 
                    defaultValue={this.props.currentTitle}
                    placeholder='Title'></input>
                  <textarea 
                    placeholder='Type anything...'
                    id='entryText' 
                    name='entryText' 
                    value={this.props.currentEntry}
                    onChange={(event) => this.props.updateEntry(event.target.value)}>
                  </textarea>
                  <button type='submit' id='save-button'>Save</button>
                </form>  
              </section>            
              </div>
            </div>
        </div>        
      </div>
    )
  }
}