import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import MessageListContainer from './MessageListContainer'
import MessageContainer from './MessageContainer'

const RestApi = require(`../controllers/RestApi${process.env.DEBUG_REST === 'true' ? 'Sample' : ''}`)

import './app.css'

class App extends Component {
  state = { headers: [], headersLoaded: false, error: undefined }

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

  handleSubmitMessage = msg => {
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
  }

  handleDeleteMessage2 = id => {
    RestApi.delete(id)
      .then(deletedCount => {
        let headers = this.state.headers.filter(element => element.id !== id)
        // console.log('headers=', headers)
        this.setState({
          headers,
          headersLoaded: true,
          error: undefined
        })
      })
      .catch(error => {
        console.log('RestApi.delete error: ', error)
        this.setState({
          headers: [],
          headersLoaded: false,
          error
        })
      })
  }
  handleDeleteMessage = id => console.log(`Message ${id} was deleted!`)

  render() {
    return (
      <div id='container'>
        <Route
          exact path="/"
          render={() => (
            <MessageListContainer
              headersLoaded={this.state.headersLoaded}
              onSubmit={this.handleSubmitMessage}
              onDelete={this.handleDeleteMessage}
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