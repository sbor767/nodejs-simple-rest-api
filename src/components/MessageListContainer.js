import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../presentation/Header'
import Loading from '../presentation/Loading'
import MessageList from '../presentation/MessageList'

export default class MessageListContainer extends Component {
  state = { header: '', body: '' }

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

  handleHeaderInputChange = e => this.setState({ header: e.target.value })
  handleBodyInputChange = e => this.setState({ body: e.target.value })

  handleSubmit = () => {
    this.props.onSubmit( {header: this.state.header, body: this.state.body} )
    this.setState({ header: '', body: '' })
  }

  handleBodyKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  render() {
    {/*<MessageList headers={this.props.headers} onDelete={this.props.onDelete} />*/}
    return (
    <div id="ForumContainer" className="inner-container">
      <Header>
        <p>
          @TODO Test Job specification
        </p>
      </Header>
      {this.props.headersLoaded ? (
        <MessageList headers={this.props.headers} onDel={this.props.onDelete} />
      ) : (
        <Loading />
      )}
      <div id="message-input">
        <input
          type="text"
          name="header"
          placeholder="Add your subject..."
          onChange={this.handleHeaderInputChange}
          // @TODO Implement jump to body field on 'Enter' keydown.
          // onKeyDown={this.handleHeaderKeyDown}
          value={this.state.header}
        />
        <textarea
          placeholder="Add your message..."
          onChange={this.handleBodyInputChange}
          onKeyDown={this.handleBodyKeyDown}
          // value={this.state.newMessage.body}
          value={this.state.body}
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