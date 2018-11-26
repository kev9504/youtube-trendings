/* eslint-env jest */
import React from 'react';
import App from './App';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Router, Switch, Route,Redirect} from 'react-router-dom';

configure({adapter: new Adapter()});
describe('<App/>',()=>{
  const wrapper=mount(<App />);
  it('should render without crashing',()=>{
    expect(wrapper).toBeDefined();
  });
  it('should render a Router component',()=>{
    expect(wrapper.find(Router)).toHaveLength(1);
  });
  it('should render a Switch component',()=>{
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
  it('should render 2 routes',()=>{
    expect(wrapper.find(Route)).toHaveLength(2);
  });
});

