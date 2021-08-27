import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults:[],
      playlistName:"New Playlist",
      playlistTracks:[],
    };
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
    this.establishToken=this.establishToken.bind(this);
  }

  addTrack( track ){
    if( this.state.playlistTracks.find( savedTrack => { return savedTrack.id === track.id } ) ) {
      return;
    } else {
      this.setState( prevState => {
        return {playlistTracks: prevState.playlistTracks.concat(track)};
      });

    }
  }

  removeTrack( track ){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter( currentTrack => { return currentTrack.id !== track.id });
    this.setState({
      playlistTracks:tracks
    });
  }

  updatePlaylistName( name ){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map( (track) => { return track.uri } );
    Spotify.savePlaylist( this.state.playlistName ,trackURIs );
    this.setState({
      playlistName:"",
      playlistTracks:[]
    });
  }

  search( term ){
    console.log( term );
    Spotify.search( term ).then( searchResults => {
      this.setState({ searchResults: searchResults })
    });

    /*
    this.setState({
      SearchResults: Spotify.search( term ) 
    });
    */
  }

  establishToken(){
    window.onload=Spotify.getAccessToken();
  }

  render(){
    this.establishToken();

    return (
      <div>

        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch={this.search}/>

          <div className="App-playlist">

            <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>

            <Playlist
            playlistTracks={this.state.playlistTracks} 
            playlistName={this.state.playlistName}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
