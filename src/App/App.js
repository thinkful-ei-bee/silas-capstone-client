import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import EntryPage from '../EntryPage/EntryPage'


function App() {
  return (
    <div className="App">

      <Route exact path='/' component={LandingPage} />

      <Route path='/entry' component={EntryPage} />

    </div>
  );
}

export default App;
