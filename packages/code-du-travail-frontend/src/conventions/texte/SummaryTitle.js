import React from "react";
import SummaryItem from "./SummaryItem";
import styled from "styled-components";
import find from "unist-util-find";

const SummaryTitle = ({ type, data, children, expanded, onToggleExpanded }) => {
  const { id, titre } = data;
  const visible = find({ children: children }, node => node.visible);

  return (
    <Wrapper title={`${type} ${id}`}>
      <div>
        <Title>
          {children && children.length > 0 ? (
            <TitleLink
              href="#"
              onClick={e => {
                e.preventDefault();
                onToggleExpanded(id, !expanded);
              }}
            >
              {titre}&nbsp;{expanded ? "▲" : "▼"}
            </TitleLink>
          ) : (
            <TitleLink href={`#${id}`}>{titre}</TitleLink>
          )}
        </Title>
      </div>
      {(expanded || visible) &&
        children.map((child, idx) => (
          <SummaryItem key={idx} level={0} maxLevel={10} {...child}>
            {child.children}
          </SummaryItem>
        ))}
    </Wrapper>
  );
};

const Title = styled.h4`
  font-size: 14px;
`;

const TitleLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  clear: both;
`;

export default SummaryTitle;
