import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import MessageListContainer from './MessageListContainer'
import MessageContainer from './MessageContainer'

const RestApi = require(`../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

import './app.css'

class App extends Component {
  state = {
    headers: [],
    headersLoaded: false,
    editItemId: undefined,
    error: undefined
  }

  componentDidMount() {
    RestApi.getList()
      .then(headers => {
        this.setState({
          headers,
          headersLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log('RestApi.getList error: ', error)
        this.setState({
          headers: [],
          headersLoaded: false,
          error
        })
      })
  }

  handleSubmitMessage = (msg, id = undefined) => {
    if (!id) {
      // Create message.
      RestApi.create(msg)
        .then(newId => {
          // console.log('handleSubmitMessage.msg=', msg)
          // console.log('handleSubmitMessage.newId=', newId)
          // console.log('this.state.headers=', this.state.headers)
          let headers = [...this.state.headers]
          headers.push({id: newId, header: msg.header})
          // console.log('headers=', headers)
          this.setState({
            headers,
            headersLoaded: true,
            error: undefined
          })
        })
        .catch(error => {
          console.log('RestApi.create error: ', error)
          this.setState({
            headers: [],
            headersLoaded: false,
            error
          })
        })
    } else {
      // Edit message.
      RestApi.updateOne(msg, id)
        .then(count => {
          console.log(`Successfully updated ${count} records.`)
          let headers = [...this.state.headers]
          headers.forEach((value) => {if (value.id === id) value.header = msg.header})
          // console.log('headers=', headers)
          this.setState({
            headers,
            headersLoaded: true,
            editItemId: undefined,
            error: undefined
          })
        })
        .catch(error => {
          console.log('RestApi.updateOne error: ', error)
          this.setState({
            error
          })
        })
    }
  }

  handleCancelEditMessage = () => this.setState({ editItemId: undefined })

  handleDeleteMessage = id => {
    RestApi.delete(id)
      .then(() => {
        console.log(`Successfully deleted item with id=${id}.`)
        let headers = this.state.headers.filter(element => element.id !== id)
        this.setState({
          headers,
          headersLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log(`Error when deleted item with id=${id}.`)
        console.log('RestApi.delete error: ', error)
        this.setState({
          headers: [],
          headersLoaded: false,
          error
        })
      })
  }

  handleEditMessage = id => {
    this.setState({ editItemId: id })
  }

  render() {
    return (
      <div id='container'>
        <Route
          exact path="/"
          render={() => (
            <MessageListContainer
              headersLoaded={this.state.headersLoaded}
              onSubmit={this.handleSubmitMessage}
              onCancel={this.handleCancelEditMessage}
              editItemId={this.state.editItemId}
              onEditItem={this.handleEditMessage}
              onDeleteItem={this.handleDeleteMessage}
              headers={this.state.headers}
            />
          )}
        />
        <Route
          path="/messages/:id"
          render={({ history, match }) => (
            <MessageContainer
              headers={this.state.headers}
              headersLoaded={this.state.headersLoaded}
              messageId={match.params.id}
            />
          )}
        />
      </div>
    )
  }
}

export default withRouter(App)