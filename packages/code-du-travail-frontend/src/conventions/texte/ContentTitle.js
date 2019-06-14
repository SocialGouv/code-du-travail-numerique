import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

const ContentTitle = ({ level, type, id, titre }) => {
  const tagName = getTitleTagName({ type, level });
  return (
    <Title id={id} as={tagName}>
      {type == "article" && (
        <span role="img" aria-label="article">
          📖&nbsp;
        </span>
      )}
      {titre}
    </Title>
  );
};

const getTitleTagName = ({ type, level }) => {
  if (type == "article") {
    return "h5";
  } else if (level === 0) {
    return "h3";
  } else {
    return "h4";
  }
};

const Title = styled.span`
  margin-top: ${props =>
    props.type != "article" && props.level === 0 ? theme.spacing.large : "0"};
  font-size: ${props =>
    props.type == "article"
      ? theme.fonts.sizeH6
      : props.level === 0
      ? theme.fonts.sizeH5
      : theme.fonts.sizeH4};
  font-size: 16px;
`;

export { ContentTitle, getTitleTagName };
