import React from "react";
import styled from "styled-components";

const ContentTitle = ({ level, type, id, titre }) => {
  if (type == "article") {
    return (
      <ArticleTitle id={id}>
        <span role="img" aria-label="article">
          📖
        </span>
        &nbsp;{titre}
      </ArticleTitle>
    );
  } else if (level == 0) {
    return <TopSectionTitle id={id}>{titre}</TopSectionTitle>;
  } else {
    return <NestedSectionTitle id={id}>{titre}</NestedSectionTitle>;
  }
};

// TODO: this method should be used in the styled component definitions below
const getTitleTagName = ({ type, level }) => {
  if (type == "article") {
    return "h5";
  } else if (level == 0) {
    return "h3";
  } else {
    return "h4";
  }
};

const TopSectionTitle = styled.h3`
  font-size: 22px;
  margin-top: 40px;
`;

const NestedSectionTitle = styled.h4`
  font-size: 20px;
`;

const ArticleTitle = styled.h5`
  font-size: 16px;
`;

export { ContentTitle, getTitleTagName };
