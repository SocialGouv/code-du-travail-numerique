import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Results } from "./Results";
import { Law } from "./Law";
import { Themes } from "./Themes";
import { matopush } from "../../piwik";

const SearchResults = ({
  items: { documents, themes, articles },
  isSearch,
  query
}) => {
  const router = useRouter();
  useEffect(() => {
    const toSlug = ({ source, slug }) => `${source}/${slug}`;
    const results = JSON.stringify({
      documents: documents.map(toSlug),
      themes: themes.map(toSlug),
      articles: articles.map(toSlug)
    });
    matopush(["trackEvent", "candidateResults", router.query.q, results]);
  });
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
