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

  handleDeleteMessage = id => {
    RestApi.delete(id)
      .then(deletedCount => {
        console.log('deletedCount=', deletedCount)
        let aaa
        aaa = deletedCount.text()
        // deletedCount.text().then(v => aaa = v)
        console.log('deletedCountJson=', aaa)

        console.log(`Successfully deleted item with id=${id}.`)
        let headers = this.state.headers.filter(element => element.id !== id)
        // console.log('headers=', headers)
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

  render() {
    return (
      <div id='container'>
        <Route
          exact path="/"
          render={() => (
            <MessageListContainer
              headersLoaded={this.state.headersLoaded}
              onSubmit={this.handleSubmitMessage}
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