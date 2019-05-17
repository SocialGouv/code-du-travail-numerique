import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { theme } from "@cdt/ui/";

const SummaryItem = ({ data, children, type, level, visible }) => {
  const { titre, id } = data;
  return (
    <Wrapper level={level} title={`${type} ${id}, level ${level}`}>
      <Title visible={visible}>
        <TitleLink href={`#${id}`}>{titre}</TitleLink>
      </Title>
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

const Title = styled.h4`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: 0 0 5px 0;
  color: ${theme.colors.darkGrey};
  font-weight: normal;
  ${props =>
    props.visible &&
    css`
      background: #ddd;
    `}
`;

const TitleLink = styled.a`
  color: #000,
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default SummaryItem;
