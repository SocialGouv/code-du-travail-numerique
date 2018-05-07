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

  // Sort articles by a custom alphabetical order: L - R - D, then others (Annexe etc.)
  let articlesL = [];
  let articlesR = [];
  let articlesD = [];
  let articlesOther = [];
  theme.articles.forEach(function (article) {
    switch (article[0]) {
      case 'L':
        articlesL.push(article);
        break;
      case 'R':
        articlesR.push(article);
        break;
      case 'D':
        articlesD.push(article);
        break;
      default:
        articlesOther.push(article);
    }
  });
  theme.articles = [].concat(articlesL.sort(), articlesR.sort(), articlesD.sort(), articlesOther.sort());

  if (theme.articles.length) {
    return <div>{enhanceArticles(theme.articles).map(PreviewArticle)}</div>;
  }
};

export default PreviewArticles;
