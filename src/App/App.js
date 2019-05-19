import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import EntryPage from '../EntryPage/EntryPage'
import Registration from '../Registration/Registration'
import ApiServices from '../services/api-service'
import IdleService from '../services/idle-service'
import Login from '../Login/Login';
import history from '../history'
import TokenService from '../services/token-service';
import banList from '../quotes/ban-list'
import QuoterContext from '../context/quoter-context';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      title: '',
      userEntries: [],
      quotes: [],
      error: null,
      saveToggle: true,
    }
  }

  updateEntry = (entry) => {
    this.setState({
      entry
    })
  }

  updateTitle = (title) => {
    this.setState({ title })
  }

  updateUserEntries = (userEntries) => {
    this.setState({ userEntries })
  }

  handleError = (response) => {
    this.setState({ error: response.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  resetState = () => {
    this.setState({
      entry: '',
      title: '',
      userEntries: [],
      quotes: [],
      error: null,
    })
  }

  toggleSave = () => {
    this.setState({ saveToggle: !this.state.saveToggle })
  }

  findQuote() {
      setInterval(() => {
        if (this.state.entry.length > 0) {
          const entry = this.state.entry.split(' ')
          const subject = entry[Math.floor(Math.random() * entry.length)]

          ApiServices.getQuoteBySubject(subject)
            .then(quote => {

              if (!quote) {
                console.error(`No match for ${quote}`)
                return
              }

              let accum = this.state.quotes
              accum.push(quote.contents)

              this.setState({
                quotes: accum
              })
            })
            .catch(err => {
              console.error(err)
            })
        }

    }, 8000)
  }

  checkQuoteIsValid(quote) {
    if (banList.includes(quote)) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    // Find a new quote every X seconds
    this.findQuote()

    // Interval JWT refresh
    IdleService.setIdleCallback(this.logoutFromIdle)

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        ApiServices.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">

        <QuoterContext.Provider
          value={{
            currentEntry: this.state.entry,
            currentTitle: this.state.title,
            error: this.state.error,
            handleError: this.handleError,
            clearError: this.clearError,
            resetState: this.resetState,
            quotes: this.state.quotes,
            updateEntry: this.updateEntry,
            updateTitle: this.updateTitle,
            updateUserEntries: this.updateUserEntries,
            userEntries: this.state.userEntries,
            toggleSave: this.toggleSave,
            saveToggle: this.state.saveToggle,
          }}>
          <Route exact path='/' history={history} component={LandingPage} />

          <Route path='/entry' history={history} render={({history}) => 
            <EntryPage history={history} />} 
          />

          <Route path='/register' render={({history}) => 
            <Registration history={history} />} 
          />
          
          <Route path='/login' render={({history}) => 
            <Login history={history}/>} 
          />
        </QuoterContext.Provider>

      </div>
    );
  }
}

export default App;
