import React from 'react'

export default class EntryPage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className='entry-page'>
        <form id='entry-form'>
          <textarea onChange={(event) => this.props.updateEntry(event.target.value)}></textarea>
        </form>
      </div>
    )
  }
}