import React from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FastRewind from '@material-ui/icons/FastRewind';
import DeleteIcon from '@material-ui/icons/Delete';
import Napster from '../models/Napster';
import FlashPlayer from '../models/Flash_player';
import Html5Player from '../models/Html5_player';

export const ControlUI = (props) => {
  return (
    <div id='parent'>


      <div>

        <Button variant="contained" size="medium" color="primary">
          Next
				</Button>

        <Button variant="contained" size="medium" color="primary">
          Previous
				</Button>

        <Button variant="contained" size="medium" color="primary">
          Clear
				</Button>
        <Button variant="contained" size="medium" color="primary">
          Repeat
				</Button>
        <Button variant="contained" size="medium" color="primary">
          Shuffle
				</Button>
        <Button variant="contained" size="medium" color="primary">
          Pause
				</Button>
        <Button variant="contained" size="medium" color="primary">
          Resume
				</Button>

      </div>

    </div>
  );
}


export default ControlUI;
