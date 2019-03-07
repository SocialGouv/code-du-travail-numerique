import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import elementBuilder from "../index";

class List extends React.PureComponent {
  render() {
    const { data, headingLevel } = this.props;
    const items = data.$.map((item, index) => (
      <li key={index}>{elementBuilder(item.$, headingLevel + 1)}</li>
    ));

    if (data._.type === "puce") {
      return <ul>{items}</ul>;
    }
    return <ol>{items}</ol>;
  }
}

List.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired
};

export default List;
