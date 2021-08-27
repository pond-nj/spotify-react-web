import React from 'react';
import './Track.css';


export default class Track extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //count:0
        };
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
    }


    renderAction(){
        if( this.props.isRemoval === true ){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        }else {
            //DEBUGGER
            return <button className="Track-action" onClick={this.addTrack}>{/*this.state.count*/}+</button>

        }
    }

    removeTrack( ){
        this.props.onRemove( this.props.track );
    }

    addTrack( ){
        this.props.onAdd( this.props.track );
        //this.setState( prevState => { return { count: prevState.count+1} } );
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p> {this.props.track.artists} | {this.props.track.albun}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}