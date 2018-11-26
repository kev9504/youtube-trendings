/* eslint-env jest */
import React from 'react';
import { BrowserRouter as Router, Redirect,Link} from 'react-router-dom';
import YoutubePlayer from './Youtube.Player';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

configure({adapter: new Adapter()});

describe('<YoutubePlayer />',()=>{
  window.history.pushState({}, 'test',"/youtube/WBGbYagI6G4");
  let wrapper=mount(<Router><YoutubePlayer/></Router>);
  it('should render without crashing',()=>{
    expect(wrapper.find(".video-container")).toHaveLength(1);
  });
  it('should render a link to main page',()=>{
    expect(wrapper.find(Link)).toHaveLength(1);
  });
  it('should redirect when invalid URL',()=>{
    window.history.pushState({}, 'test',"/youtube/WBGbYagI6G455");
    wrapper=mount(<Router><YoutubePlayer/></Router>);
    expect(wrapper.find(".video-container")).toHaveLength(0);
  });
});
