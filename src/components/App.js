import React, { Component } from 'react'
import './app.css'
import LoginContainer from './LoginContainer'

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
      <div id='container' className='inner-container'>
        <LoginContainer />
      </div>
    )
  }
}

export default App