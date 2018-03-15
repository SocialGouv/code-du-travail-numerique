import React from "react";

import Article from "./Article";

const PreviewArticles = ({ theme }) => {
  // Sort articles by a custom alphabetical order: L - R - D, then others (Annexe etc.)
  let articlesL = [];
  let articlesR = [];
  let articlesD = [];
  let articlesOther = [];
  theme.articles.forEach(function(article) {
    switch (article[0]) {
      case "L":
        articlesL.push(article);
        break;
      case "R":
        articlesR.push(article);
        break;
      case "D":
        articlesD.push(article);
        break;
      default:
        articlesOther.push(article);
    }
  });
  theme.articles = [].concat(
    articlesL.sort(),
    articlesR.sort(),
    articlesD.sort(),
    articlesOther.sort()
  );

  if (theme.articles.length) {
    return <div>{theme.articles.map(id => <Article key={id} id={id} />)}</div>;
  }
};

export default PreviewArticles;
