/* globals Napster */
/* eslint-disable filenames/match-regex */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { AppContext } from '../context/app'

import { loadTracks } from '../actions/app'

import Track from './Track'

import { napsterApiKey } from '../config'

class Tracks extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    refreshToken: PropTypes.string.isRequired,
    loadTracks: PropTypes.func.isRequired,
    tracks: ImmutablePropTypes.list.isRequired
  }

  componentDidMount () {
    Napster.init({ 
      consumerKey: napsterApiKey, 
      isHTML5Compatible: true 
    })

    Napster.player.on('ready', (e) => {
      Napster.member.set({ 
        accessToken: this.props.accessToken, 
        refreshToken: this.props.refreshToken
      })

      Napster.api.get(true, '/tracks/top', (data) => {
        console.log('data: ', data)
        Napster.player.clearQueue()

        this.props.loadTracks({
          tracks: data.tracks
        })

        // $t.click(function () {
        //   var id = track.id.charAt(0).toUpperCase() + track.id.slice(1)
        //   //TODO: make everything downcase this is a hack so i can debug my queue stuff
        //   if (Napster.player.currentTrack === id) {
        //     Napster.player.playing ? Napster.player.pause() : Napster.player.resume(id)
        //   }
        //   else {
        //     $('[data-track="' + id + '"] .progress-bar').width(0)
        //     $('[data-track="' + id + '"] .current-time').html($('[data-track="' + id + '"] .duration').html())

        //     Napster.player.play(id)
        //   }
        // })

        // $t.appendTo('#tracks')
        // Napster.player.queue(track.id.charAt(0).toUpperCase() + track.id.slice(1))

        // Napster.api.get(false, '/albums/' + track.albumId + '/images', function (data) {
        //   var images = data.images
        //   $('[data-track="' + track.id + '"] .album-art')
        //     .append($('<img>', { src: images[0].url }))
        // })
      })
    })
  }

  render () {
    return this.props.tracks.size > 0
      ? this.props.tracks.map(track => (
        <Track 
          key={track.get('id')} 
          id={track.get('id')}
          track={track}
        />
      ))
      : null
  }
}

const mapStateToProps = state => ({
  tracks: state.getIn(['app', 'tracks']),
  accessToken: state.getIn(['app', 'accessToken']),
  refreshToken: state.getIn(['app', 'refreshToken'])
})

const mapDispatchToProps = {
  loadTracks
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    context: AppContext
  }
)(Tracks)
