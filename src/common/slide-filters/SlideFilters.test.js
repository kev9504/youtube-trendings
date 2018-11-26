/* eslint-env jest */
import React from 'react';
import SlideFilters from './SlideFilters';
import {configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {appConfig} from '../../config.js';

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
  it('should be defined',()=>{
    expect(wrapper.find(".slide-filters-container")).toBeDefined();
  });
  it('should fetch categories',()=>{
    wrapper.instance().loadCategories().then(data=>{
      expect(data.length).toBeEqual(appConfig.maxVideosToLoad);
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
});



