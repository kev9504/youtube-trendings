import Axios from 'axios';
import {appConfig} from '../../config';
import {VideoClass} from '../../models/video.class';

const axios = Axios.create({
  baseURL: appConfig.getYoutubeEndPoint('videos')
});

export class YoutubeService {
  getTrendingVideos(
    videosPerPage = appConfig.maxVideosToLoad, 
    selectedRegion=appConfig.defaultRegion,
    selectedCategory=appConfig.selectedCategory) {
    const params = {
      part: appConfig.partsToLoad,
      chart: appConfig.chart,
      videoCategoryId: selectedCategory,
      regionCode: selectedRegion,
      maxResults: videosPerPage,
      key: appConfig.youtubeApiKey
    };

    return axios.get('/', {params}).then((res) => {
      return res.data.items
        .map((item) => new VideoClass(item))
        .filter((item) => item.id !== '');
    }).catch((err) => err);
  }
}
