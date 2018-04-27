import React from "react";
//import styled from "styled-components";

import articles from "./data/eposeidon-articles";

// add article text from eposeidon-articles.js
const enhanceArticles = refs =>
  refs
    .map(ref => ({
      id: ref,
      ...articles[ref]
    }))
    .filter(Boolean)
    .map(article => ({
      id: article.id,
      title: `Article ${article.id}`,
      text: articles[article.id] && articles[article.id][0].Texte
    }));

const PreviewArticle = ({ id, title, text }) => (
  <div key={id} style={{ marginBottom: 5 }}>
    <b>{title}</b>
    <br />
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

const PreviewArticles = ({ theme }) => {
  if (theme.articles.length) {
    return <div>{enhanceArticles(theme.articles).map(PreviewArticle)}</div>;
  }
};

export default PreviewArticles;
