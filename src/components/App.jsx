import React, { Component } from 'react';
import List from './List';
import axios from "axios";
import ControlUI from "./ControlUI";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTracks: [],
      store: []
    }
  }
  componentDidMount() {
    axios.get('https://api.napster.com/v2.2/tracks/top?apikey=')
      .then(json => json.data.tracks.map(song => ({
        name: `${song.name}`,
        artistName: `${song.artistName}`,
        previewURL: `${song.previewURL}`
      }))).
      then(newData => this.setState({ allTracks: newData, store: newData })).
      catch(error => console.log(error))
  }



  render() {
    const { allTracks } = this.state
    return (
      <div>
        <ControlUI />
        <List songs={allTracks} />
      </div>
    );
  }
}
export default App;
