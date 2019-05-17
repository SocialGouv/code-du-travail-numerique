import React from "react";
import PropTypes from "prop-types";
import Metadata from "./Metadata";
import ContentItem from "./ContentItem";
import { Section } from "@cdt/ui";

const Content = ({ texte, node }) => {
  return (
    <Section>
      <Metadata texte={texte} />
      {node.children.map((child, idx) => (
        <ContentItem key={idx} {...child}>
          {child.children}
        </ContentItem>
      ))}
    </Section>
  );
};

Content.propTypes = {
  texte: PropTypes.object.isRequired,
  node: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.array
      })
    )
  }).isRequired
};

export default Content;
