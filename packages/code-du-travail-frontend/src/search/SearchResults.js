import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Alert, NoAnswer, Button } from "@cdt/ui";

import { FeedbackModal } from "../common/FeedbackModal";
import { Link } from "../../routes";

import { getLabelBySource, getRouteBySource } from "../sources";

const ContentBody = ({ _source, excerpt, sourceType }) => (
  <article className={_source.source}>
    <header>
      <Title>
        <SourceType>{sourceType} | </SourceType>
        {_source.title}
      </Title>
    </header>
    <Excerpt
      dangerouslySetInnerHTML={{ __html: excerpt }}
      className="text-quote"
    />
  </article>
);

const makeExcerpt = highlight => {
  if (highlight && Object.keys(highlight).length) {
    const firstHighlightObjectKeyName = Object.keys(highlight)[0];
    // Use the first `n` available highlights as excerpt.
    const numExcerpts = 3;
    return highlight[firstHighlightObjectKeyName]
      .slice(0, numExcerpts)
      .join(" … ");
  }
  return "";
};

class ResultItem extends React.Component {
  itemRef = React.createRef();
  componentDidMount() {
    if (this.props.focused) {
      this.itemRef.current.focus();
    }
  }
  render() {
    const { _source, highlight, query } = this.props;
    const excerpt = makeExcerpt(highlight);

    const route = getRouteBySource(_source.source);
    const anchor = _source.anchor ? _source.anchor.slice(1) : "";
    // internal links
    if (route) {
      return (
        <li className="search-results__item">
          <Link
            route={route}
            params={{ q: query, slug: _source.slug }}
            hash={anchor}
          >
            <a className="search-results-link" ref={this.itemRef}>
              <ContentBody
                _source={_source}
                sourceType={getLabelBySource(_source.source)}
                excerpt={excerpt}
              />
            </a>
          </Link>
        </li>
      );
    }

    // external urls
    return (
      <li className="search-results__item">
        <a
          href={_source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="search-results-link"
        >
          <ContentBody _source={_source} excerpt={excerpt} />
        </a>
      </li>
    );
  }
}

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.string,
    data: PropTypes.shape({
      hits: PropTypes.shape({
        total: PropTypes.integer,
        hits: PropTypes.array.isRequired
      }).isRequired
    })
  };

  static defaultProps = {
    query: "",
    source: "",
    data: { hits: { total: 0, hits: [] } }
  };

  state = {
    feedbackVisible: false
  };

  // contains the first result item ref
  // in order to move focus to it
  firtResultRef = React.createRef();

  componentDidMount() {
    if (this.firtResultRef.current) {
      this.firtResultRef.current.focus();
    }
  }
  showFeedBackPopup = () => {
    this.setState({ feedbackVisible: true });
  };

  closeModal = () => {
    this.setState({ feedbackVisible: false });
  };

  render() {
    const { data, query, source } = this.props;
    // No results.
    if (!data || !data.hits || !data.hits.total) {
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
        <div className="search-results">
          {data.snippet && (
            <ResultSnippet>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.snippet._source.html
                }}
              />
              {data.snippet._source.references && (
                <SourceLink
                  href={data.snippet._source.references[0].url}
                  norel
                  noopener
                >
                  {data.snippet._source.references[0].titre}
                </SourceLink>
              )}
            </ResultSnippet>
          )}
          <ul className="search-results__list">
            {data.hits.hits.map((result, i) => (
              <ResultItem
                focused={i === 0}
                key={result["_id"]}
                {...result}
                query={this.props.query}
              />
            ))}
          </ul>
        </div>
        <NoAnswer>
          <Button onClick={this.showFeedBackPopup}>Posez votre question</Button>
        </NoAnswer>
        <FeedbackModal
          results={data.hits.hits.slice(3)}
          isOpen={this.state.feedbackVisible}
          closeModal={this.closeModal}
          query={query}
        />
      </React.Fragment>
    );
  }
}

export default SearchResults;
const Title = styled.h3`
  font-size: 1.1rem;
  margin-top: 0;
`;

const SourceType = styled.span`
  color: #53657d;
  font-size: 1rem;
  margin-left: 0.25em;
`;

const Excerpt = styled.blockquote`
  margin: 0;
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
