import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Alert, theme } from "@cdt/ui";

import { Link } from "../../routes";

import { getLabelBySource } from "../sources";
import { SearchResultList } from "./SearchResultList";
import { Faceting } from "./Faceting";

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.string,
    results: PropTypes.shape({
      facets: PropTypes.array,
      items: PropTypes.array
    }).isRequired
  };

  static defaultProps = {
    query: "",
    source: "",
    results: { facets: [], items: [] }
  };

  state = {
    feedbackVisible: false
  };

  showFeedBackPopup = () => {
    this.setState({ feedbackVisible: true });
  };

  closeModal = () => {
    this.setState({ feedbackVisible: false });
  };

  render() {
    const { results, query, source } = this.props;
    // No results.
    if (results.items.length === 0) {
      return (
        <Alert category="primary">
          <p>Nous n&apos;avons pas trouvé de résultat pour votre recherche.</p>
          {source.length > 0 && (
            <p>
              Vous pouvez élargir la recherche en intégrant&nbsp;
              <strong>
                <Link route="recherche" params={{ q: query, source: "" }}>
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
            <Faceting data={results.facets} query={query} />
          </Aside>
        )}
        <Content>
          <div className="search-results">
            {results.items.snippet && (
              <ResultSnippet>
                <p
                  dangerouslySetInnerHTML={{
                    __html: results.items.snippet._source.html
                  }}
                />
                {results.items.snippet._source.references && (
                  <SourceLink
                    href={results.items.snippet._source.references[0].url}
                    target="_blank"
                    norel
                    noopener
                  >
                    {results.items.snippet._source.references[0].titre}
                  </SourceLink>
                )}
              </ResultSnippet>
            )}
            <Title>
              {source ? getLabelBySource(source) : "Questions et réponses"}
            </Title>
            <SearchResultList items={results.items} query={query} />
          </div>
        </Content>
      </SearhResultLayout>
    );
  }
}

export default SearchResults;

const { colors, spacing, fonts, box } = theme;

const SearhResultLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Aside = styled.div`
  flex: 1 1 calc(20% - ${spacing.base});
  margin-right: ${spacing.base};
`;

const Content = styled.div`
  margin-left: ${spacing.base};
  flex: 1 1 calc(80% - ${spacing.base});
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: ${spacing.large};
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
