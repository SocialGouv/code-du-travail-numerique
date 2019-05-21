import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TocList = ({ children }) => (
  <Wrapper className="toc-list is-collapsible">{children}</Wrapper>
);

const Wrapper = styled.ol`
  border: 0;
  margin: 0;
  padding: 0;
  &.is-collapsed {
    display: none;
  }
`;

TocList.propTypes = {
  children: PropTypes.array
};

export default TocList;
