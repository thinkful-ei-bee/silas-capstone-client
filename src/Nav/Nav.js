import React from 'react'

export default class Nav extends React.Component {
  render() {
    return (
      <div className='qnav'>
        <h1 onClick={() => this.props.history.push('/')}>Quoter</h1>
      </div>
    )
  }
}