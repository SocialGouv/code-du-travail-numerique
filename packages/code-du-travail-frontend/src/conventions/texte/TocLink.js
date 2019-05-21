import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TocLink = ({ className, id, onClick, children }) => (
  <Link
    href={`#${id}`}
    className={`${className} toc-link node-name--H3`} // titles from all levels are rendered with h3 so far
    onClick={onClick}
  >
    {children}
  </Link>
);

const Link = styled.a`
  font-size: 14px;
  text-decoration: none;
  &:hover,
  &.is-active-link {
    font-weight: bold;
  }
`;

TocLink.propTypes = {
  children: PropTypes.array
};

export default TocLink;
