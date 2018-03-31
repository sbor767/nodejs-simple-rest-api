import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer'
import UserContainer from './UserContainer'
import './app.css'

class App extends Component {
  state = { user: null }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user })
      } else {
        // This fired in any case - also when the first entry have place.
        this.props.history.push('/login')
      }
    })
  }

  handleSubmitMessage = msg => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    }
    firebase
      .database()
      .ref('messages/')
      .push(data)
  }

  render() {
    return (
      <div id='container'>
        <Route path="/login" component={LoginContainer} />
        <Route
          exact path="/"
          render={() => <ChatContainer onSubmit={this.handleSubmitMessage} />}
        />
        <Route path="/users/:id" component={UserContainer} />
      </div>
    )
  }
}

export default withRouter(App)