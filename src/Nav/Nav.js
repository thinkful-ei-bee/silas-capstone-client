import React from 'react'

export default class Nav extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div id='qnav'>
        <h1 onClick={() => this.props.history.history.push('/')}>Quoter</h1>
      </div>
    )
  }
}