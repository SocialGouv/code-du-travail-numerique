import React from "react";

//
// render prop that store a key value in state.filters
// call props.render({ filters, addFilter, removeFilter, resetFilters })
//

// handle state for a selection of filters
export default class Filters extends React.Component {
  state = {
    filters: {}
  };
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      filters: props.filters || {}
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      filters: props.filters
    });
  }
  addFilter = (key, value) => {
    // add a filter
    //const similarFilters = getSimilarFilters(key, value);
    this.setState(curState => ({
      filters: {
        ...curState.filters,
        // ...similarFilters,
        [key]: value
      }
    }));
  };
  resetFilters = () => {
    this.setState({
      filters: {}
    });
  };
  removeFilter = filter => {
    // remove a filter
    this.setState(curState => {
      const newFilters = { ...curState.filters };
      delete newFilters[filter];
      return {
        filters: newFilters
      };
    });
  };
  render() {
    return this.props.render({
      filters: this.state.filters,
      addFilter: this.addFilter,
      removeFilter: this.removeFilter,
      resetFilters: this.resetFilters
    });
  }
}
