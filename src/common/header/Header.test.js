/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '@material-ui/core/Drawer';


configure({adapter: new Adapter()});
describe('<Header />', ()=>{
  const wrapper=shallow(<Header />);
  it('should render without crashing', ()=>{
    expect(wrapper.find('#page-header')).toHaveLength(1);
  });
  it('should not render drawer when drawerIsOpened==false',()=>{
    expect(wrapper.find(<Drawer />)).toHaveLength(0);
  });
})