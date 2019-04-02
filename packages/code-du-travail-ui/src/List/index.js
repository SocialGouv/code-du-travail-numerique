import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = ({ className, items }) => (
  <ul className={className}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string
};

List.defaultProps = {
  className: ""
};

const StyledList = styled(List)`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export default StyledList;
