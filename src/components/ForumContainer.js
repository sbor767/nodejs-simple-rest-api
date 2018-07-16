import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactDom from 'react-dom'
import HeaderContainer from './HeaderContainer'

export default class ForumContainer extends Component {
  state = { newMessage: '' }

  componentDidMount() {

    this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) this.scrollToBottom()
  }

  scrollToBottom = () => {
    const messageContainer = ReactDom.findDOMNode(this.messageContainer)
    if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight
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
      <HeaderContainer>
        <p>
          @TODO Test Job specification
        </p>
      </HeaderContainer>
      {this.props.messagesLoaded ? (
        <div key='1'
          id="message-container"
          ref={element => {
            this.messageContainer = element
          }}
        >

          {this.props.messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`message`}
            >
              <p title={`id=${msg.id}`}>{msg.header}</p>
              <Link to={`/messages/${msg.id}`}>
                <button className="blue">Open {msg.id}</button>
              </Link>
              <button className="red" onClick={this.handleLogout} title='Delete'>Delete</button>
            </div>
          ))}
        </div>
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