import React, { Component } from 'react'
import Header from './Header'

class LoginContainer extends Component {
  state = { email: '', password: '', error: '' }

  handleEmailChange = event => this.setState({ email: event.target.value})

  handlePasswordChange = event => this.setState({ password: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: '' })
    if (this.state.email && this.state.password) {
      this.login()
    } else {
      this.setState({ error: 'Please fill in both fields.' })
    }

    console.log(this.state)
  }

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => this.onLogin())
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.signup()
        } else {
          this.setState({ error: 'Error loggin in. Something wrong.' })
        }
      })
  }

  onLogin() {
    // Redirect to '/'.
    this.props.history.push('/')
  }

  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => console.log('Created user: ', res))
      .catch(err => {
        console.log('Error: ', err)
        // this.setState({ error: 'Error signing up. ' . err.message })
        this.setState({ error: 'Error signing up. ' })
      })
  }

  render = () => (
    <div id='LoginContainer' className='inner-container'>
      <Header />
      <form onSubmit={this.handleSubmit}>
        <p>Sign in or sign up by entering your email and password.</p>
        <input
          type='text'
          onChange={this.handleEmailChange}
          value={this.state.email}
          placeholder='Your email'
        />
        <input
          type='password'
          onChange={this.handlePasswordChange}
          value={this.state.password}
          placeholder='Your password'
        />
        <p className="error">{this.state.error}</p>
        <button className='red light' type='submit'>Login</button>
      </form>

    </div>
  )
}

export default LoginContainer