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
      saveConfirm: '',
      username: '',
      password: '',
    }
  }

  updateUsername = (username) => {
    console.log('USERNAME: ', username)
    this.setState({ username })
  }

  updatePassword = (password) => {
    this.setState({ password })
  }

  clearCreds = () => {
    this.setState({
      username: '',
      password: '',
    })
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

  handleSaveConfirm = (message) => {
    this.setState({ saveConfirm: message })
  }

  clearSaveConfirm = () => {
    this.setState({ saveConfirm: '' })
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
          let subject = entry[Math.floor(Math.random() * entry.length)]
          let banListCheckCount = 0

          // Check 20 random words in the entry
          // If none are valid, return
          while (!this.checkSubjectIsValid(subject) && banListCheckCount < 21) {
            subject = entry[Math.floor(Math.random() * entry.length)]
            banListCheckCount++
          }

          if (banListCheckCount >= 20) {
            return
          }

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

  checkSubjectIsValid(quote) {
    return (!banList.includes(quote))
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
            clearError: this.clearError,
            clearSaveConfirm: this.clearSaveConfirm,
            clearCreds: this.clearCreds,
            error: this.state.error,
            handleError: this.handleError,
            handleSaveConfirm: this.handleSaveConfirm,
            password: this.state.password,
            quotes: this.state.quotes,
            resetState: this.resetState,
            saveToggle: this.state.saveToggle,
            saveConfirm: this.state.saveConfirm,
            toggleSave: this.toggleSave,
            updateEntry: this.updateEntry,
            updateTitle: this.updateTitle,
            updateUserEntries: this.updateUserEntries,
            userEntries: this.state.userEntries,
            updateUsername: this.updateUsername,
            updatePassword: this.updatePassword,
            username: this.state.username,
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
