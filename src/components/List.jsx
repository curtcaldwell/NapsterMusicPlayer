import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ControlUI from "./ControlUI";
import { Napster } from "../models/Napster";
import { Html5Player } from "../models/Html5_player";
import { FlashPlayers } from "../models/Flash_player";
const List = (props) => {
  const { songs } = props;

  return (
    <div>
      <ul>
        {songs.map((track, i) => <li key={i}>Song Name: {track.name}<br />
          <p>Artist Name: {track.artistName}</p>
          <audio src={track.previewURL} controls></audio>
        </li>)}
      </ul>
      <ControlUI />
    </div>
  );
}
export default List

// Napster.player.play(id);