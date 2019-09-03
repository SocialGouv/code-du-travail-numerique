import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Alert, theme } from "@cdt/ui-old";

import Link from "next/link";

import { getLabelBySource } from "../sources";
import { SearchResultList } from "./SearchResultList";
import { Faceting } from "./Faceting";

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.string,
    results: PropTypes.shape({
      snippet: PropTypes.shape({
        html: PropTypes.string,
        references: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            titre: PropTypes.string
          })
        )
      }),
      facets: PropTypes.array,
      items: PropTypes.array
    }).isRequired
  };

  static defaultProps = {
    query: "",
    source: "",
    results: { facets: [], items: [] }
  };

  render() {
    const { results, query, source } = this.props;
    // No results.
    if (results.items.length === 0) {
      return (
        <Alert>
          Nous n’avons pas trouvé de résultat pour votre recherche.
          {source.length > 0 && (
            <p>
              Vous pouvez élargir la recherche en intégrant&nbsp;
              <strong>
                <Link
                  href={{
                    pathname: "/recherche",
                    query: { q: query, source: "" }
                  }}
                >
                  <a>les autres sources de documents</a>
                </Link>
              </strong>
            </p>
          )}
        </Alert>
      );
    }
    return (
      <SearhResultLayout>
        {results.facets.length > 0 && (
          <Aside>
            <Faceting data={results.facets} query={query} source={source} />
          </Aside>
        )}
        <Content>
          {results.snippet && (
            <ResultSnippet>
              <div
                dangerouslySetInnerHTML={{
                  __html: results.snippet.html
                }}
              />
              {results.snippet.references && (
                <SourceLink
                  href={results.snippet.references[0].url}
                  target="_blank"
                  norel
                  noopener
                >
                  {results.snippet.references[0].titre}
                </SourceLink>
              )}
            </ResultSnippet>
          )}
          <h3>{source ? getLabelBySource(source) : "Questions et réponses"}</h3>
          <SearchResultList items={results.items} query={query} />
        </Content>
      </SearhResultLayout>
    );
  }
}

export default SearchResults;

const { breakpoints, colors, spacing, fonts, box } = theme;

const SearhResultLayout = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Aside = styled.div`
  flex: 1 1 auto;
  margin-right: ${spacing.base};
`;

const Content = styled.div`
  flex: 1 1 65%;
`;

const ResultSnippet = styled.div`
  border-radius: ${box.borderRadius};
  background-color: ${colors.white};
  padding: ${spacing.small};
  margin-bottom: ${spacing.large};
  p {
    font-size: 1.1rem;
  }
`;

const SourceLink = styled.a`
  font-size: ${fonts.sizeSmall};
`;
