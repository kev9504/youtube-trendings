import { YoutubeService, CategoriesService } from './Youtube';
import expect from 'expect';

it('renders without crashing', () => {
    const youtubeService=new YoutubeService();
    expect(youtubeService).toBeDefined();
});
it('renders without crashing',()=>{
    const categoryService=new CategoriesService();
    expect(categoryService).toBeDefined();
});
it('getTrendingVideos function', async () => {
  const service = new YoutubeService();
  const result = await service.getTrendingVideos();
  expect(result.length).toEqual(24);
});
it('getCategories function', async () => {
  const service = new CategoriesService();
  const result = await service.getCategories();
  expect(result.length).toBeGreaterThan(0);
});
