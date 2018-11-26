/* eslint-disable */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './Header.scss';
import Logo from '../../../public/logo.svg';
import SlideFilters from '../slide-filters/SlideFilters';

export class Header extends Component {
  state = {
    drawerIsOpened: false,
    title: ''
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      this.setState({title : this.props.setTitle()});
    }, 100);
  }

  toggleDrawer=(open)=>{
    this.setState({drawerIsOpened: open});
  }
  
  render() {
    let filterGearButton=null
    if(this.props.location.pathname=="/youtube"||this.props.location.pathname=="/youtube/"){
      filterGearButton=<Button className="menu-toggle" onClick={()=>this.toggleDrawer(true)}>
                  <SettingsIcon aria-label="Settings"/>
                 </Button>
    }
    return (
      <div id="page-header">
        <nav>
          <div className="logo-bg">
            <Logo className="logo"/>
          </div>
          <div className="opened-module-title">
            {this.state.title}
          </div>
          {filterGearButton}
        </nav>
        <Drawer
          anchor="right"
          open={this.state.drawerIsOpened}
          onClose={()=>this.toggleDrawer(false)}>
            <SlideFilters 
            config={this.props.config} 
            onChanges={this.props.onChanges}
            onToggleDrawer={this.toggleDrawer}
            />
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  setTitle: PropTypes.func,
  config: PropTypes.object,
  onChanges: PropTypes.func,
  onToggleDrawer: PropTypes.func,
};

export default withRouter(Header);
