import React from 'react'

export default class EntryPage extends React.Component {
  render() {
    return (
      <div className='entry-page'>
        <form id='entry-form'>
          <textarea onChange={() => console.log('ok')}></textarea>
        </form>
      </div>
    )
  }
}