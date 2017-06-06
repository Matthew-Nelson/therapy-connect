import React, { Component } from 'react';
import './App.css';
import clientAuth from './clientAuth'
//import your components here

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: currentUser ? 'main' : 'home'
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }

  _logIn(credentials) {
    console.log(credentials)
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'main'
      })
    })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }

  _main() {
    this.setState({
      view: 'main'
    })
  }

  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.loggedIn ? this.state.currentUser.name : 'Not Logged In'}</h2>
        </div>
        <ul>
          {/* if we are not logged in, render the list item */}
          {!this.state.loggedIn && (
            <li><button name='signup' onClick={this._setView.bind(this)}>Sign Up</button></li>
          )}
          {/* cant put two items into one conditional because you can only return one element in a jsx */}
          {!this.state.loggedIn && (
            <li><button name='login' onClick={this._setView.bind(this)}>Log In</button></li>
          )}
          {this.state.loggedIn && (
            <li><button onClick={this._logOut.bind(this)}>Log Out</button></li>
          )}
        </ul>
        {{
          home: <h1>The Home View</h1>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
          main: <Main onMain={this._main.bind(this)} />
        }[this.state.view]}
        <div className="Main">
          {this.state.currentUser && (
            <div>
              <h2>Main info</h2>
              {/* will load if PT */}
              {this.state.currentUser.isPt && (
                <div id="isPT">
                  <h3>i AM a pt</h3>
                  <h3>{this.state.currentUser.isPt.toString()}</h3>
                </div>
              )}
              {/* will load if not a PT */}
              {!this.state.currentUser.isPt && (
                <div id="notPT">
                  <h3>im NOT a pt</h3>
                  <h3>{this.state.currentUser.isPt.toString()}</h3>
                </div>
              )}
            </div>
          )}
      </div>
      </div>
    )
  }
}

class SignUp extends Component {
  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      isPt: this.refs.isPt.checked

    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
          Name: <input type='text' placeholder='Name' ref='name' /> <br></br>
          Email: <input type='text' placeholder='Email' ref='email' /> <br></br>
          Password: <input type='password' placeholder='Password' ref='password' /> <br></br>
          Are you signing up as a therapist? <input type='radio' ref='isPt' /><br></br>
          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

class LogIn extends Component {
  _handleLogin(evt) {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onLogin(credentials)
  }

  render() {
    return (
      <div className='container'>
        <h2>Log In</h2>
        <form onSubmit={this._handleLogin.bind(this)}>
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}

class Main extends Component {
  _

  render() {
    return (
      <div className='container'>
        <h2>Main</h2>
      </div>
    )
  }
}

export default App;
