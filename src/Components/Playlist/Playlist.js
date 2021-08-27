import './Playlist.css';
import React from 'react';
import Tracklist from '../TrackList/TrackList.js'

export default class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }

    render(){
        return(
            <div className="Playlist">
                <input
                defaultValue="New Playlist"
                onChange={this.handleNameChange}/>

                <Tracklist
                tracks={this.props.playlistTracks}
                isRemoval={true}
                onRemove={this.props.onRemove}/>

                <button
                className="Playlist-save"
                onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}