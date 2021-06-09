import { Container, Section } from "@socialgouv/cdtn-ui";
import { classifyTokens } from "@socialgouv/reference-article";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { matopush } from "../../piwik";
import { Law } from "./Law";
import { Results } from "./Results";
import { Themes } from "./Themes";

const SearchResults = ({
  items: { documents, themes, articles },
  isSearch,
  query,
}) => {
  const [articleQuery, setArticleQuery] = useState(false);

  useEffect(() => {
    // distinction between actual search and theme search when logging
    const eventType = isSearch ? "candidateResults" : "themeResults";
    matopush(["trackEvent", eventType, query]);
  });

  useEffect(() => {
    setArticleQuery(classifyTokens(query.split(" ")).includes(true));
  }, [query]);

  return (
    <>
      {articleQuery && articles.length > 0 && (
        <Section decorated variant="light">
          <Container>
            <Law items={articles} query={query} />
          </Container>
        </Section>
      )}
      {!articleQuery && documents.length > 0 && (
        <Results isSearch={isSearch} items={documents} query={query} />
      )}
      {!articleQuery && (articles.length > 0 || themes.length > 0) && (
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
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string,
        source: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        breadcrumbs: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            slug: PropTypes.string,
          })
        ),
        slug: PropTypes.string,
        source: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string,
        source: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
};

export { SearchResults };
