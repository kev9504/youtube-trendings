/* eslint-env jest */
import React from 'react';
import Youtube from './Youtube';
import {configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {appConfig} from '../../config';

configure({adapter: new Adapter()});

let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }
  store();
};
let titleStore = '';
const setTitle = (title) => {
  if (title) {
    titleStore = title;
  }
  return titleStore;
};

describe('<Youtube />',()=>{
  const wrapper=mount(<Youtube config={appConfig} onChanges={onChanges} setTitle={setTitle}/>);
  it('should render without crashing',()=>{
    expect(wrapper).toBeDefined();
  });
  it('should load trending videos',()=>{
    wrapper.instance().loadVideos().then(data=>{
      expect(wrapper.state().trends.length).toEqual(wrapper.props().config.maxVideosToLoad);
    });
  });
  it('should append the next page videos',()=>{
    wrapper.instance().loadMoreVideos().then(data=>{
      expect(wrapper.state().trends.length).toEqual(wrapper.props().config.maxVideosToLoad*2);
    });
  });
  it('should not render error if isError false',()=>{
    expect(wrapper.find(".error-plate")).toHaveLength(0);
  });
  it('should render error component if isError true',()=>{
    wrapper.setState({isError: true});
    expect(wrapper.find(".error-plate")).toHaveLength(1);
  });
});


