import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getTitleTagName } from "./../ContentTitle";

const TocLink = ({ className, id, type, level, onClick, children }) => {
  const tagName = getTitleTagName({ type, level });
  return (
    <Link
      href={`#${id}`}
      className={`${
        className ? className : ""
      } toc-link node-name--${tagName.toUpperCase()}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Link = styled.a`
  font-size: 14px;
  text-decoration: none;
  &:hover,
  &.is-active-link {
    font-weight: bold;
  }
`;

TocLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default TocLink;
