import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@socialgouv/react-ui";

import { Results } from "./Results";
import { Law } from "./Law";
import { Themes } from "./Themes";
import { matopush } from "../../piwik";
import { formatUrlMatomo } from "../utils";

const SearchResults = ({
  items: { documents, themes, articles },
  isSearch,
  query
}) => {
  useEffect(() => {
    const toLogCandidate = ({ url, source, slug, algo }) => {
      const trackedUrl = formatUrlMatomo(source, slug, url);
      return {
        slug: trackedUrl,
        algo
      };
    };
    const results = JSON.stringify({
      documents: documents.map(toLogCandidate),
      themes: themes.map(toLogCandidate),
      articles: articles.map(toLogCandidate)
    });
    // distinction between actual search and theme search when logging
    const eventType = isSearch ? "candidateResults" : "themeResults";
    matopush(["trackEvent", eventType, query, results]);
  });

  return (
    <>
      {documents.length > 0 && (
        <Results isSearch={isSearch} items={documents} query={query} />
      )}
      {(articles.length > 0 || themes.length > 0) && (
        <Section decorated variant="light">
          <Container>
            {articles.length > 0 && <Law items={articles} query={query} />}
            {themes.length > 0 && <Themes items={themes} query={query} />}
          </Container>
        </Section>
      )}
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
        slug: PropTypes.string,
        breadcrumbs: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            slug: PropTypes.string
          })
        )
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
