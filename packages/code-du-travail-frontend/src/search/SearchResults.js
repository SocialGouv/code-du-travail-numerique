import React from "react";
import PropTypes from "prop-types";

import { Alert, NoAnswer, Button } from "@cdt/ui";

import { FeedbackModal } from "../common/FeedbackModal";
import SeeAlso from "../common/SeeAlso";
import { Link } from "../../routes";

import { getLabelBySource, getRouteBySource } from "../sources";

const ContentBody = ({ _source, excerpt, footer = null }) => (
  <article className={_source.source}>
    <header>
      <h3>{_source.title}</h3>
    </header>
    <blockquote
      className="text-quote"
      dangerouslySetInnerHTML={{ __html: excerpt }}
    />
    <footer>
      <span className="external-link__before">{footer}</span>
    </footer>
  </article>
);

const makeExcerpt = highlight => {
  if (highlight && Object.keys(highlight).length) {
    let firstHighlightObjectKeyName = Object.keys(highlight)[0];
    // Use the first `n` available highlights as excerpt.
    const numExcerpts = 3;
    return highlight[firstHighlightObjectKeyName]
      .slice(0, numExcerpts)
      .join(" … ");
  }
  return "";
};

const ResultItem = ({ _source, highlight, query }) => {
  const excerpt = makeExcerpt(highlight);

  const route = getRouteBySource(_source.source);
  const anchor = _source.anchor ? _source.anchor.slice(1) : "";

  // internal links
  if (route) {
    return (
      <li className="search-results__item">
        <Link
          route={route}
          params={{ q: query, search: 0, slug: _source.slug }}
          hash={anchor}
        >
          <a className="search-results-link">
            <ContentBody
              _source={_source}
              excerpt={excerpt}
              footer={getLabelBySource(_source.source)}
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
        <ContentBody
          _source={_source}
          excerpt={excerpt}
          footer={getLabelBySource(_source.source)}
        />
      </a>
    </li>
  );
};

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    data: PropTypes.shape({
      hits: PropTypes.shape({
        total: PropTypes.integer,
        hits: PropTypes.array.isRequired
      }).isRequired
    })
  };

  static defaultProps = {
    query: "",
    data: { hits: { total: 0, hits: [] } }
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
    let data = this.props.data;
    let query = this.props.query;
    // No results.
    if (!data || !data.hits || !data.hits.total) {
      return (
        <React.Fragment>
          <div className="section-light">
            <div className="container">
              <Alert category="primary">
                Nous n’avons pas trouvé de résultat pour votre recherche.
              </Alert>
            </div>
          </div>
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
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="section-light">
          <div className="container">
            <div className="search-results">
              <ul className="search-results__list">
                {data.hits.hits.map(result => (
                  <ResultItem
                    key={result["_id"]}
                    {...result}
                    query={this.props.query}
                  />
                ))}
              </ul>
            </div>
          </div>
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

        <SeeAlso />
      </React.Fragment>
    );
  }
}

export default SearchResults;
