import React from "react";

import FeedbackForm from "./FeedbackForm.js";
import SeeAlso from "./SeeAlso";
import { Link } from "../routes";


const NoResult = ({ data }) => (
  <div className="notification error">
    <p>Nous n’avons pas trouvé de résultat pour votre recherche.</p>
  </div>
);

const Results = ({ data }) => (
  <ul className="search-results__list">
    {data.map(result => <ResultItem key={result["_id"]} {...result} />)}
  </ul>
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

  let body = (
    <article key={_id} className={_source.source}>
      <header>
        <h3>Une période de chômage permet-elle de valider des trimestres de retraite ?</h3>
      </header>
      <blockquote
        className="text-quote"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </article>
  );

  // Internal link.
  if (_source.source === "faq" || _source.source === "code_bfc") {
    return (
      <li className="search-results__item">
        <Link route="index" params={{ type: "questions", id: _id }}>
          <a className="search-results-link">{body}</a>
        </Link>
      </li>
    );
  }

  // External link.
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

  // <footer>
  // <span className="external-link__before">{source}</span>
  // </footer>

};

class SearchResults extends React.Component {
  render() {
    let data = this.props.data;
    let query = this.props.query;

    // No query.
    if (!data) {
      return null;
    }

    // No results.
    if (!data.hits.total) {
      return <NoResult />;
    }

    return (
      <div>
        <div class="section-light">
          <div class="container">
            <div class="search-results">
              <Results data={data.hits.hits} />
            </div>
          </div>
        </div>
        <SeeAlso />
        <FeedbackForm query={query} />
      </div>
    );
  }
}

export default SearchResults;
