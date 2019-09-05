import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old/";
import { sortByIntOrdre } from "../../utils";
import Article from "./Article";

// Beware, this one is recusrive !
const Content = ({ data, depth }) => {
  const { sections = [], articles = [] } = data;
  const contents = sections.concat(articles);
  contents.sort(sortByIntOrdre);
  return (
    <>
      {contents.map((content, index) => {
        // if node has a content key, it can only be an article
        if (content.content) {
          return <Article key={index} {...content} />;
        }
        return (
          <React.Fragment key={index}>
            <Title id={content.id} depth={depth} as={depth ? "h4" : "h3"}>
              {content.title}
            </Title>
            <Content data={content} depth={depth + 1} />
          </React.Fragment>
        );
      })}
    </>
  );
};

Content.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string.isRequired,
    sections: PropTypes.array,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string
      })
    )
  }).isRequired,
  depth: PropTypes.number.isRequired
};

export default Content;

const { fonts } = theme;

const Title = styled.h3`
  font-size: ${props => (props.depth ? fonts.sizeH4 : fonts.sizeH3)};
`;
