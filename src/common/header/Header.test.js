/* eslint-env jest */
import { Header } from './Header';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import {appConfig} from '../../config';


const config = appConfig;
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
configure({adapter: new Adapter()});
describe('<Header />', ()=>{
  const wrapper=shallow(<Header 
  config={config} 
  onChanges={onChanges} 
  setTitle={setTitle}
  location={{pathname:"/youtube"}}/>);
  it('should be defined',()=>{
    expect(wrapper).toBeDefined();
  });
  it('should render',()=>{
    expect(wrapper.find('#page-header')).toHaveLength(1);
  });
  it('should render filter menu',()=>{
    expect(wrapper.find('.menu-toggle')).toHaveLength(1);
  });
  it('should not render gear if on video path',()=>{
    const location={pathname: '/youtube/h9OiEQzfrt4'};
    wrapper.setProps({location: location});
    expect(wrapper.find('.menu-toggle')).toHaveLength(0);
  });
  it('should render drawer',()=>{
    expect(wrapper.find(Drawer)).toHaveLength(1);
  });
  it('should toggle drawer true',()=>{
    wrapper.instance().toggleDrawer(true);
    expect(wrapper.state().drawerIsOpened).toBeTruthy();
  });
  it('should toggle drawer false',()=>{
    wrapper.instance().toggleDrawer(true);
    wrapper.instance().toggleDrawer(false);
    expect(wrapper.state().drawerIsOpened).toBeFalsy();
  });
})