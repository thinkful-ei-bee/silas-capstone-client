import React from 'react'
import ApiService from '../services/api-service'

export default class UserEntryList extends React.Component {

  componentDidMount() {
    ApiService.getUserEntries()
      .then(entries => {
        this.props.updateUserEntries(entries)
      })
  }

  render() {
    return (
      <ul id='user-entry-list'>
        {this.props.userEntries.map(entry => {
          return (
            <li key={entry.id}>
              <h3>{`Entry ${entry.id}`}</h3>
            </li>
          )
        })}
      </ul>
    )
  }
}