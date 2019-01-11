/* globals Napster */
/* eslint-disable filenames/match-regex */
import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import { AppContext } from '../context/app'

const Track = ({ track, onClick }) => (
  <button
    className='track'
    data-track={track.get('id')}
    onClick={onClick}
  >
    <div className='album-art' />

    <div className='track-info'>
      <div className='progress-bar' />

      <div className='name'>
        { track.get('name') }
      </div>

      <div className='artist'>
        { track.get('artistName') }
      </div>

      <div className='duration'>
        { Napster.util.secondsToTime(track.get('playbackSeconds')) }
      </div>
      
      <div className='current-time'>
        { Napster.util.secondsToTime(track.get('playbackSeconds')) }
      </div>
    </div>
  </button>
)

Track.propTypes = {
  track: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    playbackSeconds: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => {
    const capId = id.charAt(0).toUpperCase() + id.slice(1)
    //TODO: make everything downcase this is a hack so i can debug my queue stuff
    if (Napster.player.currentTrack === capId) {
      Napster.player.playing ? Napster.player.pause() : Napster.player.resume(id)
    } else {
      // $('[data-track="' + id + '"] .progress-bar').width(0)
      // $('[data-track="' + id + '"] .current-time').html($('[data-track="' + id + '"] .duration').html())

      Napster.player.play(id)
    }
  }
})

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    context: AppContext
  }
)(Track)
