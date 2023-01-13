import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginHeader from '../LoginHeader'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', loginError: false, errorMessage: ''}

  validateLoginCredentials = async e => {
    e.preventDefault()
    const {username, password} = this.state

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const responseData = await response.json()
    if (response.ok) {
      localStorage.setItem('accountName', username)
      localStorage.setItem('accountPassword', password)
      Cookies.set('jwt_token', responseData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({loginError: true, errorMessage: responseData.error_msg})
    }
    // console.log(response)
    // console.log(responseData)
  }

  storeUsername = e => {
    this.setState({username: e.target.value})
  }

  storePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, loginError, errorMessage} = this.state

    return (
      <div className="login-page-container">
        <LoginHeader />
        <div className="login-page-bottom-container">
          <form className="login-form">
            <h1 className="login-heading">Login</h1>
            <div className="label-input-container">
              <label htmlFor="usernameInput" className="credential-label">
                USERNAME
              </label>
              <input
                value={username}
                placeholder="Username"
                id="usernameInput"
                className="credential-input"
                type="text"
                onChange={this.storeUsername}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="passwordInput" className="credential-label">
                PASSWORD
              </label>
              <input
                value={password}
                placeholder="Password"
                id="passwordInput"
                className="credential-input"
                type="password"
                onChange={this.storePassword}
              />
            </div>
            {loginError && (
              <p className="login-error-message">{errorMessage}</p>
            )}
            <button
              onClick={this.validateLoginCredentials}
              className="login-button"
              type="submit"
            >
              Login
            </button>
            <button
              onClick={this.validateLoginCredentials}
              className="sign-in-button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
