import React, { Component } from 'react'
import Message from '../presentation/Message'

const RestApi = require('../controllers/RestApi')

export default class MessageContainer extends Component {
  state = { body: undefined, bodyLoaded: false }

  // componentDidMount() {
  componentDidMount() {
    const { messageId } = this.props
    // console.log('this.props.messageId=', messageId)
    RestApi.getOneBody(messageId)
      .then(str => this.setState({
          body: str,
          bodyLoaded: true
        })
      )
  }

  render() {
    const {
      headers,
      messageId
    } = this.props

    return <Message
      header={!!headers[messageId] ? headers[messageId] : ''}
      isBodyLoaded={this.state.bodyLoaded}
      body={this.state.body}
    />
  }
}