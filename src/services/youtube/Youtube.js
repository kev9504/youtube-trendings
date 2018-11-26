import Axios from 'axios';
import {appConfig} from '../../config';
import {VideoClass} from '../../models/video.class';
import {CategoryClass} from '../../models/category.class';

const axios = Axios.create({
  baseURL: appConfig.getYoutubeEndPoint('videos')
});

export class CategoriesService{
  getCategories(selectedRegion=appConfig.defaultRegion){
    const axios=Axios.create({
      baseURL: appConfig.getYoutubeEndPoint('videoCategories')
    });
    const params={
      part: 'snippet',
      regionCode: selectedRegion,
      key: appConfig.youtubeApiKey,
    };
    return axios.get('/',{params}).then(res=>{
      return res.data.items
      .map(item=>new CategoryClass(item))
      .filter(item=>{
        const filterName=appConfig.nonWorkingFilters
        .find(i=>i.name===item.name);
        if(filterName===undefined)return true;
      })
      .filter(item=>item.id!=='');
    }).catch(err=>err);
  }
}

export class YoutubeService {
  getTrendingVideos(
    videosPerPage=appConfig.maxVideosToLoad, 
    selectedRegion=appConfig.defaultRegion,
    selectedCategory=appConfig.selectedCategory,
    nextPageToken=appConfig.pageToken) {
    const params = {
      part: appConfig.partsToLoad,
      chart: appConfig.chart,
      videoCategoryId: selectedCategory,
      regionCode: selectedRegion,
      maxResults: videosPerPage,
      key: appConfig.youtubeApiKey,
      pageToken: nextPageToken,
    };
    return axios.get('/', {params}).then((res) => {
      appConfig.pageToken=res.data.nextPageToken;
      return res.data.items.map((item) =>new VideoClass(item))
      .filter((item) => item.id !== '');
    }).catch((err) => err);
  }
}
