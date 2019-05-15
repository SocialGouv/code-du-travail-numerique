import React from "react";
import PropTypes from "prop-types";
import Article from "./Article";
import styled from "styled-components";

const ContentItem = ({ data, children, type, level }) => {
  const { titre, id } = data;
  return (
    <div>
      <Title id={id}>{titre}</Title>
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

ContentItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired
      }),
      children: PropTypes.array
    })
  )
};

const Title = styled.h3`
  font-size: 16px;
`;

export default ContentItem;
