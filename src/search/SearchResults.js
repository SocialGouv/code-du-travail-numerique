import React from "react";

import Alert from "../common/Alert";
import FeedbackForm from "../common/FeedbackForm.js";
import SeeAlso from "../common/SeeAlso";
import { Link } from "../../routes";

const Results = ({ data }) => (
  <div className="search-results">
    <ul className="search-results__list">
      {data.map(result => <ResultItem key={result["_id"]} {...result} />)}
    </ul>
  </div>
);

const ResultItem = ({ _id, _source, highlight }) => {
  let excerpt = "";
  if (highlight) {
    let firstHighlightObjectKeyName = Object.keys(highlight)[0];
    // Use the first `n` available highlights as excerpt.
    const numExcerpts = 3;
    excerpt = highlight[firstHighlightObjectKeyName]
      .slice(0, numExcerpts)
      .join(" … ");
  }

  let source;
  if (_source.source === "faq") {
    source = "Source : FAQ";
  } else if (_source.source === "code_du_travail") {
    source = "Source : Legifrance";
  } else if (_source.source === "fiches_service_public") {
    source = "Source : Service Public";
  } else if (_source.source === "fiches_ministere_travail") {
    source = "Source : Ministère du Travail";
  } else if (_source.source === "code_bfc") {
    source = "Source : DIRECCTE Bourgogne-Franche-Comté (Juin 2017)";
  } else if (_source.source === "conventions_collectives") {
    source = "Source : Legifrance";
  }

  let isInternal = ["faq", "code_bfc"].includes(_source.source);
  let footer = isInternal ? null : (
    <footer>
      <span className="external-link__before">{source}</span>
    </footer>
  );

  let body = (
    <article key={_id} className={_source.source}>
      <header>
        <h3>{_source.title}</h3>
      </header>
      <blockquote
        className="text-quote"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      {footer}
    </article>
  );

  if (isInternal) {
    return (
      <li className="search-results__item">
        <Link route="index" params={{ type: "questions", id: _id }}>
          <a className="search-results-link">{body}</a>
        </Link>
      </li>
    );
  }
  return (
    <li className="search-results__item">
      <a
        href={_source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="search-results-link"
      >
        {body}
      </a>
    </li>
  );
};

class SearchResults extends React.Component {
  render() {
    let data = this.props.data;
    let query = this.props.query;

    // No results.
    if (!data.hits.total) {
      return (
        <React.Fragment>
          <div className="section-light">
            <div className="container">
              <Alert category="primary">
                Nous n’avons pas trouvé de résultat pour votre recherche.
              </Alert>
            </div>
          </div>
          <FeedbackForm query={query} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="section-light">
          <div className="container">
            <Results data={data.hits.hits} />
          </div>
        </div>
        <SeeAlso />
        <FeedbackForm query={query} />
      </React.Fragment>
    );
  }
}

export default SearchResults;
