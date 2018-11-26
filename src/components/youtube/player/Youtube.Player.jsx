import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Youtube.Player.scss';
import Youtube from 'react-youtube';
import {Redirect} from 'react-router-dom';
class YoutubePlayer extends Component {
  state={
    id:null,
    error: false,
  }
  componentWillMount(){
    const id = window.location.href
      .replace(/^.*\//g, '')
      .replace(/^.*\..*/g, '');
    if(id.length!==11){
      this.handleError();
    }else{
      this.setState({id: id});
    }
  }
  handleError=()=>{
    window.alert('invalid video id. You\'ll be redirected to the main page');
    this.setState({error: true});
  }
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
      }
    };
    return (
      this.state.error
      ?<Redirect to="/"/>
      :<div className="video-container">
        <div className="frame-block">
        <Youtube 
        videoId={this.state.id}
        opts={opts}
        onError={()=>this.handleError()}
        onReady={(e)=>e.target.playVideo()}/>
        </div>
        <div className="controls">
          <Link className="btn btn-primary" to="/youtube"> &#60; Back to Trends</Link>
        </div>
      </div>);
  }
}

export default YoutubePlayer;

