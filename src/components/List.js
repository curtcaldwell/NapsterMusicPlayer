/* eslint-disable filenames/match-regex */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tracks from './Tracks'

import { AppContext } from '../context/app'

const List = ({ napsterLoaded }) => 
  napsterLoaded
    ? (
      <Tracks />
    )
    : null

List.propTypes = {
  napsterLoaded: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  napsterLoaded: state.getIn(['app', 'napsterLoaded'])
})

export default connect(
  mapStateToProps,
  null,
  null,
  {
    context: AppContext
  }
)(List)
