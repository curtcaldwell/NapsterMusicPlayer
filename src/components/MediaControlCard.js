import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { Icon } from '@material-ui/core'

styles = {
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}

export function MediaControlCard (props) {
  // const { card, details, content, controls, playIcon, cover } = props.styles;

  return (
    <div id='container' style={styles}>
      <Card>
        <div>
          <CardContent >
            <Typography component='h5' variant='h5'>
              Live From Space
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Mac Miller
            </Typography>
          </CardContent>
          <div>
            <IconButton aria-label='Previous'>
              <SkipNextIcon />
            </IconButton>
            <IconButton aria-label='Play/pause'>
              <PlayArrowIcon />
            </IconButton>
            <IconButton aria-label='Next'>
              <SkipPreviousIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia
          image='/static/images/cards/live-from-space.jpg'
          title='Live from space album cover'
        />
      </Card>
    </div>
  )
}

export default withStyles(style, { withTheme: true })(MediaControlCard)
