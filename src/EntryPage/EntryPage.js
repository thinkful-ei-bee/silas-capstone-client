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

        <section id='quotes-area'>
          <div className='current-quote'>
            <p className='quote-paragraph'>{
              this.props.quotes.length > 0 &&
              this.props.quotes[this.props.quotes.length - 1].quote
            }</p>
            <div className='quote-author'>{
              this.props.quotes.length > 0 &&
              '- ' + this.props.quotes[this.props.quotes.length - 1].author
            }</div>
          </div>
        </section>
      </div>
    )
  }
}