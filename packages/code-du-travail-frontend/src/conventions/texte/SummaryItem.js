import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { theme } from "@cdt/ui/";

const SummaryItem = ({ data, children, type, level, visible }) => {
  const { titre, id } = data;
  return (
    <Wrapper className="toc-list-item" level={level} title={`${type} ${id}, level ${level}`}>
      <TitleLink className="toc-link" href={`#${id}`}>
        {titre}
      </TitleLink>
      {children &&
        children.map(child => (
          <SummaryItem key={child.data.id} level={level + 1} {...child}>
            {child.children}
          </SummaryItem>
        ))}
    </Wrapper>
  );
};

SummaryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        children: PropTypes.array
      })
    })
  ),
  type: PropTypes.string,
  visible: PropTypes.bool,
  level: PropTypes.number.isRequired
};

const Wrapper = styled.div`
  margin-left: 5px;
  padding-left: 10px;
  display: none;
  &.is-active-li,
  &.is-active-li > .toc-list-item {
    // display same-level siblings of current active link
    display: block;
  }
  // this should mitigate flickering
  transition: all 300ms ease-in-out;
  ${props =>
    props.level != undefined &&
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

const TitleLink = styled.a`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: 0 0 5px 0;
  color: ${theme.colors.darkGrey};
  &:visited {
    color: ${theme.colors.darkGrey};
  }
  font-weight: normal;
  &.is-active-link {
    color: #000;
  }
  color: #000,
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default SummaryItem;
