/* globals Napster */
import React from 'react'
import Button from '@material-ui/core/Button'

const PauseButton = () => {
  Napster.player.pause()
  console.log()
}

const PlayButton = () => {
  Napster.player.resume()
  console.log('playing')
}

const NextButton = () => {
  Napster.player.next()
  console.log('hello')
}

const ControlUI = (props) => {
  return (
    <div id='parent'>

      <div>

        <Button onClick={NextButton} variant='contained' size='medium' color='primary'>
          Next
        </Button>

        <Button variant='contained' size='medium' color='primary'>
          Previous
        </Button>

        <Button variant='contained' size='medium' color='primary'>
          Clear
        </Button>
        
        <Button onClick={PauseButton} variant='contained' size='medium' color='primary'>
          Pause
        </Button>
        <Button onClick={PlayButton} variant='contained' size='medium' color='primary'>
          Resume
        </Button>

      </div>

    </div>
  )
}

export default ControlUI
