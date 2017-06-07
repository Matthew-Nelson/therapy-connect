import React, { Component } from 'react'
import './App.css'
import clientAuth from './clientAuth'
import LogIn from './Login'
import SignUp from './Signup'
//import your components here

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      clients: []
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: currentUser ? 'main' : 'home'
      // clients: [...currentUser.clients]
    })
    if(currentUser) {
      clientAuth.getClients(currentUser._id)
        .then(res => {
          this.setState({
            clients: res.data.clients
          })
        })
    }
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
    clientAuth.logIn(credentials)
      .then(user => {
        this.setState({
          currentUser: user,
          loggedIn: true,
          view: 'main'
        })
        return user
      })
      .then(user => {
        clientAuth.getClients(user._id)
          .then(res => {
            this.setState({
              clients: res.data.clients
            })
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

  _addPt(evt) {
    evt.preventDefault()
    clientAuth.addPt(this.refs.ptId.value).then(res => {
      console.log(res)
    })
  }

  _updateRoutine(evt) {
    evt.preventDefault()
    const newRoutine = {
      name: this.refs.name.value,
      body: this.refs.body.value,
      completeDate: this.refs.completeDate.value
    }
    const clientId = this.refs.client.id
    clientAuth.updateRoutine(newRoutine, clientId)
  }

  render() {


    const clients = this.state.clients.map((client, i) => {
      return (
        <option ref='client' key={i} id={client._id}>
          {client.name}
        </option>
      )
    })
    // console.log(clients);

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
              {this.state.currentUser.isPt && (
                <div id="isPT">
                  <form>
                    Client: <select id="clientName">
                      {clients}
                    </select><br></br>
                    Name: <input ref="name" type="text" placeholder="Routine Name"></input><br></br>
                    Body: <textarea ref="body" placeholder="Routine Details"></textarea><br></br>
                    Date: <input ref="completeDate" type="date"></input><br></br>
                    <input type="submit" onClick={this._updateRoutine.bind(this)}></input><br></br>
                  </form>

                </div>
              )}
              {!this.state.currentUser.isPt && (
                <div id="notPT">
                  <h3>im NOT a pt</h3>
                  <h3>{this.state.currentUser.isPt.toString()}</h3>
                  <form onSubmit={this._addPt.bind(this)}>
                    <input ref="ptId" type="text" placeholder="PT id"></input>
                    <button type='submit'>Add pt</button>
                  </form>
                </div>
              )}
            </div>
          )}
      </div>
      </div>
    )
  }
}

class Main extends Component {

  render() {
    return (
      <div className='container'>
        <h2>Main</h2>
      </div>
    )
  }
}

export default App;
