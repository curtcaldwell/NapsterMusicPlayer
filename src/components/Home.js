/* eslint-disable filenames/match-regex */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import List from './List'
import ControlUI from './ControlUI'
import './App.css'
import { logIn } from '../actions/app'
import { AppContext } from '../context/app'
import LoginComponent from './login'

class Home extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired,
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }
  
  componentDidMount () {
    const { code } = queryString.parse(this.props.location.search)

    if (!this.props.loggedIn && typeof code !== 'undefined') {
      this.props.logIn({ code })
    }
  }

  render () {
    return (
      <div>
        <LoginComponent />
        <ControlUI />
        <List />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.getIn(['app', 'loggedIn'])
})

const mapDispatchToProps = {
  logIn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    context: AppContext
  }
)(Home)
