import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Alert, NoAnswer, Button } from "@cdt/ui";

import { FeedbackModal } from "../common/FeedbackModal";
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
        <React.Fragment>
          <Alert category="primary">
            <p>
              Nous n&apos;avons pas trouvé de résultat pour votre recherche.
            </p>
            {source.length > 0 && (
              <p>
                Vous pouvez élargir la recherche en intégrant&nbsp;
                <strong>
                  <Link route="index" params={{ q: query, source: "" }}>
                    <a>les autres sources de documents</a>
                  </Link>
                </strong>
              </p>
            )}
          </Alert>
          <NoAnswer>
            <Button onClick={this.showFeedBackPopup}>
              Posez votre question
            </Button>
          </NoAnswer>
          <FeedbackModal
            results={[]}
            isOpen={this.state.feedbackVisible}
            closeModal={this.closeModal}
            query={query}
            source={source}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
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
                      norel
                      noopener
                    >
                      {results.items.snippet._source.references[0].titre}
                    </SourceLink>
                  )}
                </ResultSnippet>
              )}
              <Title>
                {" "}
                {source
                  ? getLabelBySource(source)
                  : "Questions et réponses"}{" "}
              </Title>
              <SearchResultList items={results.items} query={query} />
            </div>
          </Content>
        </SearhResultLayout>

        <NoAnswer>
          <Button onClick={this.showFeedBackPopup}>Posez votre question</Button>
        </NoAnswer>
        <FeedbackModal
          results={results.items.slice(3)}
          isOpen={this.state.feedbackVisible}
          closeModal={this.closeModal}
          query={query}
        />
      </React.Fragment>
    );
  }
}

export default SearchResults;

const SearhResultLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Aside = styled.div`
  flex: 1 1 calc(20% - 1rem);
  margin-right: 1em;
`;

const Content = styled.div`
  margin-left: 1rem;
  flex: 1 1 calc(80% - 1rem);
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 2.5rem;
  margin-bottom: var(--spacing-large);
`;

const ResultSnippet = styled.div`
  border-radius: 0.5rem;
  background-color: #fff;
  padding: 0.75rem;
  margin-bottom: 2rem;
  p {
    font-size: 1.1rem;
  }
`;

const SourceLink = styled.a`
  font-size: 0.9rem;
`;
