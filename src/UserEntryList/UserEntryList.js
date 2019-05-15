import React from 'react'
import ApiService from '../services/api-service'
import TokenService from '../services/token-service'
import './UserEntryList.css'

export default class UserEntryList extends React.Component {

  componentDidMount() {
    if(TokenService.getAuthToken()) {
      ApiService.getUserEntries()
        .then(entries => {
          this.props.updateUserEntries(entries)
        })
    }
  }

  handleDelete = (id) => {
    if(TokenService.getAuthToken()) {
      ApiService.deleteEntry(id)
        .then(() => {
          ApiService.getUserEntries()
            .then(entries => {
              this.props.updateUserEntries(entries)
            })
        })
    }
  }

  render() {
    return (
      <ul id='user-entry-list'>
        {this.props.userEntries && this.props.userEntries.length > 0 && this.props.userEntries.map(entry => {
          return (
            <li key={entry.id}>
              <div id={entry.id} className='entry-list-item' onClick={() => this.props.handleGetEntry(entry.id)}>
                <h3 id={entry.title}>{entry.title}</h3> 
              </div>
              <button className='delete-button' onClick={() => this.handleDelete(entry.id)}>
                <i className="fa fa-trash"></i>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}