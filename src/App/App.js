import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import EntryPage from '../EntryPage/EntryPage'
import Registration from '../Registration/Registration'
import ApiServices from '../services/api-service'
import Login from '../Login/Login';
import history from '../history'


class App extends React.Component {

// To change routs:
// return this.props.history.push('/route)
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      quotes: [],
      error: null,
    }
  }

  updateEntry = (entry) => {
    this.setState({
      entry
    })
  }

  handleError = (response) => {
    this.setState({ error: response.error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  componentDidMount() {
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
      }

    }, 8000)
  }

  render() {
    return (
      <div className="App">

        <Route exact path='/' history={history} component={LandingPage} />

        <Route path='/entry' history={history} render={(history) => 
          <EntryPage 
            handleError={this.handleError}
            clearError={this.clearError}      
            quotes={this.state.quotes}
            updateEntry={this.updateEntry}
            history={history}
          />} 
        />

        <Route path='/register' render={(history) => <Registration 
          handleError={this.handleError}
          clearError={this.clearError}   
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
