import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const TocListItem = ({ type, id, children, level = 0 }) => (
  <Wrapper level={level} title={`${type} ${id}, level ${level}`}>
    {children}
  </Wrapper>
);

const Wrapper = styled.li`
  list-style-type: none;
  margin-left: 5px;
  padding-left: 10px;
  ${props =>
    css`
      border-left: 1px solid
        rgba(
          ${(props.level + 1) * 50},
          ${(props.level + 1) * 50},
          ${(props.level + 1) * 50},
          1
        );
    `}
`;

TocListItem.propTypes = {
  level: PropTypes.number.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node
};

export default TocListItem;
