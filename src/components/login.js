import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { napsterApiKey } from '../config'

import { logOut } from '../actions/app'

import { AppContext } from '../context/app'

const napsterAPI = 'https://api.napster.com'
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${napsterApiKey}&response_type=code`

const REDIRECT_URI = 'https://localhost:3000'

class LoginComponent extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired
  }

  logIn () {
    window.location = `${oauthURL}&redirect_uri=${REDIRECT_URI}`
  }

  render () {
    return this.props.loggedIn 
      ? (
        <button 
          type='button'
          onClick={this.props.logOut}
        >Log Out</button>
      )
      : (
        <div>

          <button 
            type='button'
            onClick={this.logIn}
            className='buttonLogin'
          >Login</button>
        </div>
      )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.getIn(['app', 'loggedIn'])
})

const mapDispatchToProps = {
  logOut
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    context: AppContext
  }
)(LoginComponent)
