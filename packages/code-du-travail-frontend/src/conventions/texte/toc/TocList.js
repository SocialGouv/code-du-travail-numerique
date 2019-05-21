import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TocList = ({ children, expanded }) => (
  <Wrapper
    className={`toc-list is-collapsible ${
      expanded ? "expanded" : "not-expanded"
    }`}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled.ol`
  border: 0;
  margin: 0;
  padding: 0;
  &.is-collapsed.not-expanded {
    display: none;
  }
`;

TocList.propTypes = {
  children: PropTypes.array
};

export default TocList;
