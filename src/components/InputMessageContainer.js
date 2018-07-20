import React, {Component} from 'react'

export default class InputMessageContainer extends Component {
  state = { header: '', headerTouched: false, body: '' }

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
      </div>

    )}
}