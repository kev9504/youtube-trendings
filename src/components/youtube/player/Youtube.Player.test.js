/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import YoutubePlayer from './Youtube.Player';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
/*
configure({adapter: new Adapter()});

describe('<YoutubePlayer />',()=>{
  delete global.window
  const window = (new JSDOM(``, {url: 'https://example.org/'})).window
  global.window = window
  const wrapper=mount(<YoutubePlayer />);
  it('should render without crashing',()=>{
    expect(wrapper).toBeDefined();
  });
});
*/