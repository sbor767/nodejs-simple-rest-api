import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import ForumContainer from './ForumContainer'
import MessageContainer from './MessageContainer'
// import RstApi from '../controllers/RstApi'
// import { RstApi } from './RstApi'
// import RstApi from './RstApi'
const RstApi = require('./RstApi')

import './app.css'

class App extends Component {
  state = { headers: [], headersLoaded: false }

  componentDidMount() {
    // RstApi.getListSample()
    RstApi.getList()
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
            headers: headers,
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
            <ForumContainer
              messagesLoaded={this.state.headersLoaded}
              onSubmit={this.handleSubmitMessage}
              messages={this.state.headers}
            />
          )}
        />
        <Route
          path="/messages/:id"
          render={({ history, match }) => (
            <MessageContainer
              messages={this.state.headers}
              messagesLoaded={this.state.headersLoaded}
              messageId={match.params.id}
            />
          )}
        />
      </div>
    )
  }
}

export default withRouter(App)