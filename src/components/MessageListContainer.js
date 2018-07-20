import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from '../presentation/Header'
import Loading from '../presentation/Loading'
import MessageList from '../presentation/MessageList'
import InputMessageContainer from './InputMessageContainer'

export default class MessageListContainer extends Component {

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

  render() {
    const {
      headersLoaded,
      headers,
      onSubmit,
      onDeleteItem
    } = this.props

    return (
    <div id="ForumContainer" className="inner-container">
      <Header>
        <p>
          @TODO Test Job specification
        </p>
      </Header>
      {headersLoaded ? (
        <MessageList headers={headers} onDeleteItem={onDeleteItem} />
      ) : (
        <Loading />
      )}

      <InputMessageContainer
        onSubmit={onSubmit}
      />

    </div>
  )}
}