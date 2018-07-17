import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../presentation/Header'
import MessageList from '../presentation/MessageList'

export default class MessageListContainer extends Component {
  state = { newMessage: '' }

  componentDidMount() {

    this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.headers.length !== this.props.headers.length) this.scrollToBottom()
  }

  scrollToBottom = () => {
    const headerContainer = ReactDom.findDOMNode(this.headerContainer)
    if (headerContainer) headerContainer.scrollTop = headerContainer.scrollHeight
  }

  handleInputChange = e => this.setState({ newMessage: e.target.value })

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage)
    this.setState({ newMessage: '' })
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  render() {return (
    <div id="ForumContainer" className="inner-container">
      <Header>
        <p>
          @TODO Test Job specification
        </p>
      </Header>
      {this.props.headersLoaded ? (
        <MessageList headers={this.props.headers}/>
      ) : (
        <div id="loading-container">
          <img src="/assets/icon.png" alt="logo" id="loader" />
        </div>
      )}
      <div id="forum-input">
        <textarea
          placeholder="Add your message..."
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.newMessage}
        />
        <button onClick={this.handleSubmit}>
          <svg viewBox="0 0 24 24">
            <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </div>
  )}
}