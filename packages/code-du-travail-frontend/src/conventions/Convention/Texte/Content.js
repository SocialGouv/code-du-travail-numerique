import React from "react";
import PropTypes from "prop-types";

import { Title } from "@socialgouv/react-ui";

import Article from "./Article";
import { sortByIntOrdre } from "../../utils";
// Beware, this one is recusrive !
const Content = ({ node, depth }) => {
  const { type, children = [] } = node;
  if (type === "article") {
    return <Article item={node.data} />;
  }

  return (
    <>
      {children.sort(sortByIntOrdre).map(childNode => {
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
