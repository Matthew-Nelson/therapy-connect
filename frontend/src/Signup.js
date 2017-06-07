import React, {Component} from 'react'

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

export default SignUp
