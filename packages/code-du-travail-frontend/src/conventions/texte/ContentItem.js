import React from "react";
import Article from "./Article";
import styled from "styled-components";

const ContentItem = ({ data, children, type, level }) => {
  const { titre, id } = data;
  return (
    <div id={id}>
      <Title>{titre}</Title>
      {children &&
        children.map(child => (
          <ContentItem key={child.data.id} level={level + 1} {...child}>
            {child.children}
          </ContentItem>
        ))}
      {type == "article" && <Article {...data} />}
    </div>
  );
};

const Title = styled.h3`
  font-size: 16px;
`;

export default ContentItem;
