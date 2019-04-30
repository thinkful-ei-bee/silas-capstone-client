import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import EntryPage from '../EntryPage/EntryPage'
import Registration from '../Registration/Registration'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      entry: ''
    }
  }

  updateEntry = (entry) => {
    this.setState({
      entry
    })
  }

  render() {
    return (
      <div className="App">

        <Route exact path='/' component={LandingPage} />

        <Route path='/entry' render={() => 
          <EntryPage 
            entry={this.state.entry} 
            updateEntry={this.updateEntry}
          />} 
        />

        <Route path='/register' render={() => <Registration />} />

      </div>
    );
  }
}

export default App;
