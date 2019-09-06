import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old/";

import Article from "./Article";

// Beware, this one is recusrive !
const Content = ({ node, depth }) => {
  const { type, children = [] } = node;
  if (type === "article") {
    return <Article node={node} />;
  }

  return (
    <>
      {children.map(childNode => {
        // if node has a content key, it can only be an article
        return (
          <React.Fragment key={`content-${childNode.data.id}`}>
            <Title
              id={childNode.data.id}
              depth={depth}
              as={depth ? "h4" : "h3"}
            >
              {childNode.data.title}
            </Title>
            <Content node={childNode} depth={depth + 1} />
          </React.Fragment>
        );
      })}
    </>
  );
};

Content.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string.isRequired
    }),
    children: PropTypes.array
  }).isRequired,
  depth: PropTypes.number.isRequired
};

export default Content;

const { fonts } = theme;

const Title = styled.h3`
  font-size: ${props => (props.depth ? fonts.sizeH4 : fonts.sizeH3)};
`;
