import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RootList = ({ className, children }) => (
  <ul className={className}>{children}</ul>
);

RootList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

RootList.defaultProps = {
  className: ""
};

export const List = styled(RootList)`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li``;
