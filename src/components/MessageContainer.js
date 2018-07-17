import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
const RestApi = require('./RestApi')

export default class MessageContainer extends Component {
  state = { message: undefined, messageLoaded: false }

  componentDidMount() {
    console.log('this.props.messageId=', this.props.messageId)
    RestApi.getOneBodySample(this.props.messageId)
    // RestApi.getOneBody(this.props.messageId)
      .then(str => this.setState({
          message: str,
          messageLoaded: true
        })
      )
  }

  // getHeader = id => this.props.messages[id]
  getHeader(id) {
    console.log('id=', id)
    console.log('messages=', this.props.headers)
    console.log('header=', !!this.props.headers[id] ? this.props.headers[id] : '')
    // return !!this.props.messages[id].header
    return !!this.props.headers[id] ? this.props.headers[id] : ''
  }

  render() {return(
    <div id="MessageContainer" className="inner-container">
      <Header>
        <Link to="/">
          <button className="blue">Back To Forum</button>
        </Link>
        <button className="red">Delete</button>
      </Header>
      {this.state.messageLoaded ? (
        <div id="message-container">
          <h2 className='message-header'>{this.getHeader(this.props.messageId)}</h2>
          <p>{this.state.message}</p>
        </div>
      ) : (
        <div id="loading-container">
          <img src="/assets/icon.png" alt="logo" id="loader" />
        </div>
      )}
    </div>
  )}
}