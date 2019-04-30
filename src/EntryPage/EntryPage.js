import React from 'react'

export default class EntryPage extends React.Component {
  render() {
    return (
      <div className='entry-page'>

        <section id='entry-area'>
          <form id='entry-form'>
            <textarea onChange={(event) => this.props.updateEntry(event.target.value)}></textarea>
          </form>  
        </section>

        <section id='quotes-area'></section>
      </div>
    )
  }
}