import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer'
import './app.css'

// const App = () => <h1>Hello from React!!5</h1>
class App extends Component {
  state = { user: null }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render() {
    return (
      <div id='container'>
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" component={ChatContainer} />
      </div>
    )
  }
}

export default App