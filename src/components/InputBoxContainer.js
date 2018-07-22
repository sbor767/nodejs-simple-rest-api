/**
 * InputBoxContainer
 * This component work in two modes:
 *  - InputBox - to input and submit a new messages
 *  - EditBox - to edit existing message. This mode selected when component was called with defined editItemId in
 *  the props.
 */

import React, {Component} from 'react'

import './InputBoxContainer.css'
const RestApi = require(`../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

export default class InputBoxContainer extends Component {
  state = {
    header: '',
    headerTouched: false,
    body: '',
    bodyLoaded: false,
    error: undefined
  }

  componentWillReceiveProps(nextProps) {
    const {
      editItemId,
      headers
    } = nextProps
    if (!editItemId) return;

    // EditBox mode.
    RestApi.getOneBody(editItemId)
      .then(body => {
        let header = headers.filter(item => item.id === editItemId)[0].header
        this.setState({
            header,
            headerTouched: true,
            body,
            bodyLoaded: true,
            error: undefined
          })
        }
      )
      .catch(error => {
        console.log('RestApi.getOneBody error: ', error)
        this.setState({
          bodyLoaded: false,
          error
        })
      })
  }

  handleHeaderInputChange = e => this.setState({ header: e.target.value, headerTouched: true })
  handleBodyInputChange = e => {
    if (this.state.headerTouched) {
      this.setState({ body: e.target.value })
    } else {
      // If header not touched - set same value.
      this.setState({ body: e.target.value, header: e.target.value })
    }
  }

  handleSubmit = () => {
    if (!this.state.header && !this.state.body) return
    this.props.onSubmit({header: this.state.header, body: this.state.body}, this.props.editItemId)
    this.setState({header: '', headerTouched: false, body: '', error: undefined})
  }

  handleBodyKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  render() {
    const {
      editItemId,
      onCancel
    } = this.props

    return (
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
          placeholder="Add your message. Advice: start typing here..."
          onChange={this.handleBodyInputChange}
          onKeyDown={this.handleBodyKeyDown}
          value={this.state.body}
        />
        <button onClick={this.handleSubmit}>
          <svg viewBox="0 0 24 24">
            <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
        {!!editItemId && <button className="blue" onClick={onCancel} title='Cancel'>Cancel</button>}
      </div>

    )}
}