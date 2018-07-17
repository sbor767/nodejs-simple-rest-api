import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import MessageListContainer from './MessageListContainer'
import MessageContainer from './MessageContainer'
// import RestApi from '../controllers/RstApi'
// import { RestApi } from './RestApi'
// import RestApi from './RestApi'
const RestApi = require('../controllers/RestApi')

import './app.css'

class App extends Component {
  state = { headers: [], headersLoaded: false }

  componentDidMount() {
    RestApi.getListSample()
    // RestApi.getList()
/*
      .then(json => this.setState({
          messages: json,
          messagesLoaded: true
        })
*/
      .then(json => {
          let headers = []
          json.map((current) => {headers[current.id] = current.header})
          this.setState({
            headers,
            headersLoaded: true
          })
        }
      )
  }

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key]
      msg.id = key
      return msg
    })
    this.setState({ headers })
  }

  handleSubmitMessage = msg => {
    const data = {
      msg
    }
    firebase
      .database()
      .ref('messages/')
      .push(data)
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt()
      this.deferredPrompt.userChoice.then(choice => {
        console.log(choice)
      })
      this.deferredPrompt = null
    }
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