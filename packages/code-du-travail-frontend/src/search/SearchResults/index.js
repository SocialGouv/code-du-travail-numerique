import React from "react";
import PropTypes from "prop-types";

import { Results } from "./Results";
import { Law } from "./Law";
import { Themes } from "./Themes";

const SearchResults = ({
  items: { documents, themes, articles },
  isSearch,
  query
}) => {
  return (
    <>
      {documents.length > 0 && (
        <Results isSearch={isSearch} items={documents} query={query} />
      )}
      {articles.length > 0 && <Law items={articles} query={query} />}
      {themes.length > 0 && <Themes items={themes} query={query} />}
    </>
  );
};

SearchResults.propTypes = {
  isSearch: PropTypes.bool,
  items: PropTypes.shape({
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        source: PropTypes.string,
        slug: PropTypes.string
      })
    ),
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        source: PropTypes.string,
        slug: PropTypes.string
      })
    ),
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        source: PropTypes.string,
        slug: PropTypes.string
      })
    )
  })
};

export { SearchResults };
