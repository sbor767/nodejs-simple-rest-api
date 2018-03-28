import React, { Component } from 'react'
import './app.css'
import LoginContainer from './LoginContainer'

// const App = () => <h1>Hello from React!!5</h1>
class App extends Component {
  render() {
    return (
      <div id='container' className='inner-container'>
        <LoginContainer />
      </div>
    )
  }
}

export default App