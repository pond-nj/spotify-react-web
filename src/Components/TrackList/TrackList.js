import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js'

export default class TrackList extends React.Component{
    constructor(props){
        super(props);
        this.RenderTrack = this.RenderTrack.bind(this);
    }

    RenderTrack(){
        let tracks = this.props.tracks.map( (track) => <Track
                                                        track={track}
                                                        key={track.id}
                                                        onAdd={this.props.onAdd}
                                                        isRemoval={this.props.isRemoval}
                                                        onRemove={this.props.onRemove}/> );
        return tracks;
    }

    render(){
        return(
            <div className="TrackList">
                <this.RenderTrack />
            </div>
        );
    }
}