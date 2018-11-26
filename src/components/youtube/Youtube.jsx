/*eslint no-console: ["error", { allow: ["error"] }] */
import React, { Component } from 'react';
import Axios from 'axios';
import MovieIcon from '@material-ui/icons/Movie';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

import { YoutubeService } from '../../services/youtube/Youtube';
import './Youtube.scss';

const service = new YoutubeService();

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: [],
      isError: false
    };
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll=(e)=>{
    if(Math.ceil(window.scrollY)+window.innerHeight===document.body.offsetHeight){
      this.loadMoreVideos();
    }
  }
  componentWillMount() {
    this.props.setTitle('YOUTUBE');
    const cachedCategory=window.localStorage.getItem('trendings-category');
    if(cachedCategory){
      this.props.config.selectedCategory=cachedCategory;
    }
    const cachedCountry=window.localStorage.getItem('trendings-country');
    if(cachedCountry){
      this.props.config.selectedRegion=cachedCountry;
    }
    this.props.onChanges(() => this.loadVideos());
  }
  async loadVideos() {
    Axios.all(await service.getTrendingVideos(
      this.props.config.maxVideosToLoad,
      this.props.config.selectedRegion,
      this.props.config.selectedCategory, 
      ' '))
         .then((data) => {
           this.setState({
             trends: data,
             isError: false
           });
         })
         .catch((err) => {
           this.setState({isError: true});
           console.error(err);
         });
  }
  async loadMoreVideos(){
    Axios.all(await service.getTrendingVideos(
      this.props.config.maxVideosToLoad,
      this.props.config.selectedRegion,
      this.props.config.selectedCategory,
      this.props.config.pageToken))
      .then(data=>{
        data.map(el=>{
          const newTrendingArr=[...this.state.trends];
          newTrendingArr.push(el);
          this.setState({trends: newTrendingArr});
        });
      }).catch(err=>{
        this.setState({isError: true});
        console.error(err);
      });
  }

  openVideo() {
    return window.location.href = '/youtube/' + this;
  }

  youtubeCard() {
    return this.state.trends.map((videos, index) =>(
      <div 
      key={index} 
      className="card-container">
        <div className="card" onClick={this.openVideo.bind(videos.id)}>
          <div className="img-container">
            <img src={videos.thumbnail} alt={videos.title}/>
            <MovieIcon/>
          </div>
          <div className="video-statistic">
            <div className="publishedAt">
              <AvTimerIcon/>
              <span>{videos.publishedAt}</span>
            </div>
            <div className="viewCount">
              <VisibilityIcon/>
              <span>{videos.viewCount}</span>
            </div>
            <div className="likeCount">
              <FavoriteIcon/>
              <span>{videos.likeCount}</span>
            </div>
          </div>
          <p className="video-title text-ellipsis">
            {videos.title}
          </p>
        </div>
      </div>));
  }

  errorOnPage() {
    return <div className="error-plate">
    <WarningIcon/>
    <span>Error loading. Please try again later.</span>
  </div>;
  }

  render() {
    return !this.state.isError ? ( 
    <div 
    id="youtube">
      <div className="row">
        {this.youtubeCard()}
      </div>
    </div>) : (this.errorOnPage());
  }
}

Youtube.propTypes = {
  setTitle : PropTypes.func,
  config   : PropTypes.object,
  onChanges: PropTypes.func
};

export default Youtube;
