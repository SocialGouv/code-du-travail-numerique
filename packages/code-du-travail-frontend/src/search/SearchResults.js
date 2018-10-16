import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Section, Alert, Badge } from "@socialgouv/code-du-travail-ui";

import FeedbackForm from "../common/FeedbackForm.js";
import SeeAlso from "../common/SeeAlso";
import DecisionTree from "../lib/decision/DecisionTree";
import { getLabelBySource, getRouteBySource } from "../sources";
import ContentComponents from "../content";

const ContentTags = ({ tags }) => {
  return (
    tags &&
    Object.keys(tags)
      .reduce((a, tag) => {
        if (Array.isArray(tag)) {
          tag.forEach(t => {
            a.push(t);
          });
        } else {
          a.push(tag);
        }
        return a;
      }, [])
      .map(tag => (
        <Badge style={{ marginRight: 5 }} key={tags[tag]}>
          {tags[tag]}
        </Badge>
      ))
  );
};

// temporarely disable tags display for s-p until filtering
const ContentBody = ({ _source, excerpt, footer = null }) => (
  <article className={_source.source}>
    <header>
      <h3>{_source.title}</h3>
    </header>

    {_source.tags &&
      _source.source !== "fiches_service_public" && (
        <ContentTags tags={_source.tags} />
      )}
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

const ResultItem = ({ _id, _source, highlight, query, router }) => {
  const excerpt = makeExcerpt(highlight);

  const anchor = _source.anchor ? _source.anchor.slice(1) : "";

  const sourceRoute = getRouteBySource(_source.source);
  // internal links
  if (sourceRoute) {
    return (
      <li className="search-results__item">
        <Link
          href={{
            pathname: `/contenu/${sourceRoute}/${_source.slug}`,
            hash: anchor,
            query: { q: router.query.q, search: 0 }
          }}
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

const Results = withRouter(({ results, router }) => (
  <div className="search-results">
    <ul className="search-results__list">
      {results.map(result => (
        <ResultItem
          key={result._source.slug}
          query={router.query.q}
          router={router}
          {...result}
        />
      ))}
    </ul>
  </div>
));

class SearchResults extends React.Component {
  render() {
    const { data, query, filters, router } = this.props;
    // No results.
    if (!data || !data.hits || !data.hits.total) {
      return (
        <React.Fragment>
          <Section light>
            <Alert category="primary">
              Nous n’avons pas trouvé de résultat pour votre recherche.
            </Alert>
          </Section>
          <FeedbackForm query={query} />
        </React.Fragment>
      );
    }

    // hardcode which result can be filterable.
    const filterableResults = data.hits.hits.filter(
      hit => ["idcc", "faq"].indexOf(hit._source.source) > -1
    );

    if (filterableResults.length > 1) {
      // show decision tree and results
      return (
        <DecisionTree
          data={filterableResults}
          filters={filters}
          render={({ filters, results }) => {
            if (results.length === 1) {
              const data = results[0];
              const { View } = ContentComponents[data.source];
              return <View {...data} />;
            }
            return (
              <Section light>
                <Results results={results.map(r => ({ _source: r }))} />
              </Section>
            );
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Section light>
          <Results results={data.hits.hits} />
        </Section>
        <SeeAlso />
        <FeedbackForm query={query} />
      </React.Fragment>
    );
  }
}

export default withRouter(SearchResults);
