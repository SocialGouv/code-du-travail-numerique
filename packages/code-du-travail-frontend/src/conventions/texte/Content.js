import React from "react";
import Metadata from "./Metadata";
import ContentItem from "./ContentItem";
import { Section } from "@cdt/ui";

const Content = ({ texte, rootNode, onChangeArticleVisibility }) => {
  return (
    <Section>
      <Metadata texte={texte} />
      {rootNode.children.map((child, idx) => (
        <ContentItem
          key={idx}
          onChangeArticleVisibility={onChangeArticleVisibility}
          {...child}
        >
          {child.children}
        </ContentItem>
      ))}
    </Section>
  );
};

export default Content;
