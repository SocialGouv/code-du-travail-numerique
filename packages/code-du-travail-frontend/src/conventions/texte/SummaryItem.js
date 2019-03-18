import React from "react";
import styled, { css } from "styled-components";

const SummaryItem = ({ data, children, type, level, maxLevel, visible }) => {
  const { titre, id } = data;
  const borderColor = 0 + (level + 1) * 50;
  const style = {
    marginLeft: `5px`,
    paddingLeft: `10px`,
    borderLeft: `1px solid rgba(${borderColor}, ${borderColor}, ${borderColor}, 1)`
  };
  return (
    <div style={style} title={`${type} ${id}, level ${level}`}>
      <Title visible={visible}>
        <TitleLink href={`#${id}`}>{titre}</TitleLink>
      </Title>
      {children &&
        children.map(child => (
          <SummaryItem
            key={child.data.id}
            level={level + 1}
            maxLevel={maxLevel}
            {...child}
          >
            {child.children}
          </SummaryItem>
        ))}
    </div>
  );
};

const Title = styled.h4`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: 0 0 5px 0;
  color: #666;
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
