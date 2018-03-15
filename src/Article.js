import React from "react";

import SimpleAccordion from "./SimpleAccordion";

import articles from "./data/articles";

const getArticleContent = id => articles[id] && articles[id].texte;

const Article = ({ id }) => (
  <SimpleAccordion
    key={id}
    title={`Article ${id}`}
    content={getArticleContent(id)}
  />
);

export default Article;
