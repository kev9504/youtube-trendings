/* eslint-disable */
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import Axios from 'axios';
import './SlideFilters.scss';
import { appConfig } from '../../config';
import {CategoriesService} from '../../services/youtube/Youtube';

const service = new CategoriesService();
const countryList = appConfig.countryList;
const Handle = Slider.Handle;

const handle = (props) => {
  const {value, dragging, index, ...restProps} = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

handle.propTypes = {
  value   : PropTypes.number,
  dragging: PropTypes.func,
  index   : PropTypes.number
};

function renderInput(inputProps) {
  const {InputProps, ref, ...other} = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index           : PropTypes.number,
  itemProps       : PropTypes.object,
  selectedItem    : PropTypes.string,
  suggestion      : PropTypes.shape({name: PropTypes.string}).isRequired
};


class SlideFilters extends Component {
  state={
    categoriesList:[]
  }
  componentWillMount(){
    this.loadCategories();
  }
  async loadCategories(){
    Axios.all(await service.getCategories())
    .then(data=>{
      this.setState({categoriesList: data});
    })
    .catch(err=>console.log(err));
  }
  render() {
    const videosToLoadChange = (val) => {
      this.props.config.maxVideosToLoad = val;
      this.props.onChanges();
    };
    const setFilter=(val)=>{
      this.props.config.selectedCategory=this.state.categoriesList.find(el=>el.name==val).id;
      window.localStorage.setItem('trendings-category', this.props.config.selectedCategory);
      this.props.onChanges();
    }
    const setCountry=(val)=>{
      this.props.config.selectedRegion=this.props.config.countryList
      .find(el=>el.name==val).code;
      window.localStorage.setItem('trendings-country', this.props.config.selectedRegion);
      this.props.onChanges();
    }
    return (
      <div className="slide-filters-container">
        <h3 className="title">
          Filters
          <Button className="mat-icon-button"
          onClick={()=>this.props.onToggleDrawer(false)}>
            <CloseIcon aria-label="Close"/>
          </Button>
        </h3>
        <Downshift id="countrySelect" 
        onChange={(selection)=>setCountry(selection)}>
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              isOpen,
              selectedItem
            }) => (
            <div>
              {renderInput({
                fullWidth : true,
                InputProps: getInputProps(),
                label     : 'Select Country'
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper square>
                    {
                    countryList
                    .filter(item => !getInputProps().value.toLowerCase() || 
                    item.name.toLowerCase().includes(getInputProps().value))
                    .map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({item: suggestion.name}),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
        <div className="divider"/>
        <Downshift id="categorySelect"
        onChange={(selection)=>setFilter(selection)}>
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              isOpen,
              selectedItem
            }) => (
            <div>
              {renderInput({
                fullWidth : true,
                InputProps: getInputProps(),
                label     : 'Select Category'
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper square>
                    {
                      this.state.categoriesList
                      .filter(item=>!getInputProps().value.toLowerCase() || 
                      item.name.toLowerCase().includes(getInputProps().value))
                      .map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({item: suggestion.name}),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
        <div className="divider"/>
        <div className="videosCountPerPage">
          <div className="caption">Count of videos on the page</div>
          <div className="slider">
            <Slider
              min={1}
              max={50}
              defaultValue={this.props.config.maxVideosToLoad}
              handle={handle}
              onAfterChange={(val)=>videosToLoadChange(val)}/>
          </div>
        </div>
      </div>
    );
  }
}

SlideFilters.propTypes = {
  config   : PropTypes.object,
  onChanges: PropTypes.func,
  onToggleDrawer: PropTypes.func
};

export default SlideFilters;
