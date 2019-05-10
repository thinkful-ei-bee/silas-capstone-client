import React from 'react'
import ApiService from '../services/api-service'
import TokenService from '../services/token-service'
import './UserEntryList.css'

export default class UserEntryList extends React.Component {

  componentDidMount() {
    if(TokenService.getAuthToken()){
      ApiService.getUserEntries()
        .then(entries => {
          this.props.updateUserEntries(entries)
        })
    }
  }

  render() {
    return (
      <ul id='user-entry-list'>
        {this.props.userEntries && this.props.userEntries.length > 0 && this.props.userEntries.map(entry => {
          return (
            <li key={entry.id} onClick={(event) => this.props.handleGetEntry(event.target.id)}>
              <h3 id={entry.id}>{entry.title}</h3>
            </li>
          )
        })}
      </ul>
    )
  }
}