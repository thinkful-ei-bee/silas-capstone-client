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


class App extends React.Component {

// To change routs:
// return this.props.history.push('/route)
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      title: '',
      userEntries: [],
      quotes: [],
      error: null,
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
    console.log('error: ', response.error)
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

  componentDidMount() {
    // Find a new quote every X seconds
    setInterval(() => {
      if (this.state.entry.length > 0) {
        const entry = this.state.entry.split(' ')
        const subject = entry[Math.floor(Math.random() * entry.length)]

        ApiServices.getQuoteBySubject(subject)
          .then(quote => {

            if (!quote) {
              console.log(`No match for ${quote}`)
              return
            }

            let accum = this.state.quotes
            accum.push(quote.contents)

            this.setState({
              quotes: accum
            })
          })
          .catch(err => {
            console.log(err)
            
          })
      }

    }, 8000)

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
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">

        <Route exact path='/' history={history} component={LandingPage} />

        <Route path='/entry' history={history} render={(history) => 
          <EntryPage 
            currentEntry={this.state.entry}
            currentTitle={this.state.title}
            handleError={this.handleError}
            clearError={this.clearError}
            resetState={this.resetState}     
            quotes={this.state.quotes}
            updateEntry={this.updateEntry}
            updateTitle={this.updateTitle}
            updateUserEntries={this.updateUserEntries}
            userEntries={this.state.userEntries}
            history={history}
          />} 
        />

        <Route path='/register' render={(history) => <Registration 
          handleError={this.handleError}
          clearError={this.clearError}
          stateError={this.state.error} 
          history={history}       
        />} />
        
        <Route path='/login' render={({history}) => <Login 
          handleError={this.handleError}
          clearError={this.clearError}
          stateError={this.state.error}
          history={history}
        />} />

      </div>
    );
  }
}

export default App;
