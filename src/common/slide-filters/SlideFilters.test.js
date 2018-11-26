/* eslint-env jest */
import React from 'react';
import SlideFilters from './SlideFilters';
import {configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {appConfig} from '../../config.js';
import Downshift from 'downshift';
import Tooltip from 'rc-tooltip';

configure({adapter: new Adapter()});
let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }
  store();
};
describe('SlideFilters',()=>{
  const wrapper=mount(<SlideFilters config={appConfig} onChanges={onChanges}/>);
  it('renders without crashing',()=>{
    expect(wrapper.find(".slide-filters-container")).toHaveLength(1);
  });
  it('renders two downshifts',()=>{
    expect(wrapper.find(Downshift)).toHaveLength(2);
  });
  it('renders a tooltip',()=>{
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });
  it('should fetch categories',()=>{
    wrapper.instance().loadCategories().then(data=>{
      expect(wrapper.state().categoriesList.length).toBeGreaterThan(0);
    });
  });
  it('should change category',()=>{
    wrapper.instance().loadCategories().then(data=>{
      wrapper.instance().setFilter('Film & Animation');
      expect(wrapper.props().config.selectedCategory).toBeEqual(1);
    });
  });
  it('should change selected region',()=>{
    wrapper.setProps({onChanges: ()=>(true)});
    wrapper.instance().setCountry('Japan');
    expect(wrapper.props().config.selectedRegion).toMatch('JP');
  });
  it('should change the amount of videos loaded in page',()=>{
    wrapper.instance().videosToLoadChange(30);
    expect(wrapper.props().config.maxVideosToLoad).toEqual(30);
  });
});



