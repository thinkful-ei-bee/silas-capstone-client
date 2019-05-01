import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import EntryPage from '../EntryPage/EntryPage'
import Registration from '../Registration/Registration'
import ApiServices from '../services/api-services'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      quotes: []
    }
  }

  updateEntry = (entry) => {
    this.setState({
      entry
    })
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.entry.length > 0) {
        const entry = this.state.entry.split(' ')
        const subject = entry[Math.floor(Math.random() * entry.length)]

        ApiServices.getQuoteBySubject(subject)
          .then(quote => {

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

        <Route exact path='/' component={LandingPage} />

        <Route path='/entry' render={() => 
          <EntryPage 
            quotes={this.state.quotes}
            updateEntry={this.updateEntry}
          />} 
        />

        <Route path='/register' render={() => <Registration />} />

      </div>
    );
  }
}

export default App;
