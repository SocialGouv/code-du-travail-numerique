import { Container, Section } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import { classifyTokens } from "@socialgouv/reference-article";
import React, { useEffect } from "react";

import { Law } from "./Law";
import { Results } from "./Results";
import { Themes } from "./Themes";

type Props = {
  items: { documents; themes; articles };
  isSearch?: boolean;
  query?: any;
};
const SearchResults = ({
  items: { documents, themes, articles },
  isSearch,
  query,
}: Props) => {
  useEffect(() => {
    // distinction between actual search and theme search when logging
    if (isSearch) {
      matopush(["trackEvent", "candidateResults", query]);
    } else {
      matopush(["trackEvent", "themeResults", ""]);
    }
  });
  let isArticleSearch = false;
  if (isSearch && query && classifyTokens(query.split(" ")).includes("B-ART")) {
    isArticleSearch = true;
  }

  return (
    <>
      {isArticleSearch && articles.length > 0 && (
        <Section decorated variant="light">
          <Container>
            <Law items={articles} query={query} />
          </Container>
        </Section>
      )}
      {!isArticleSearch && documents.length > 0 && (
        <Results
          isSearch={isSearch}
          items={documents}
          query={query}
          id="SearchResults"
        />
      )}
      {!isArticleSearch && (articles.length > 0 || themes.length > 0) && (
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

export { SearchResults };
