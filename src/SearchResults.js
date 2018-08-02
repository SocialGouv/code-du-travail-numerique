import React from "react";
import styled from "styled-components";

import FeedbackForm from "./FeedbackForm.js";
import SeeAlso from "./SeeAlso";
import { Link } from "../routes";

const NoResultContainer = styled.div`
  margin-top: 20px;
`;

const NoResult = ({ data }) => (
  <NoResultContainer className="notification error">
    <p>Nous n’avons pas trouvé de résultat pour votre recherche.</p>
  </NoResultContainer>
);

const ResultsContainer = ({ data }) => (
  <div>{data.map(result => <Result key={result["_id"]} {...result} />)}</div>
);

const Result = ({ _id, _source, highlight }) => {
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
        <h1>{_source.title}</h1>
      </header>
      <blockquote
        className="text-quote"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <footer>{source}</footer>
    </article>
  );

  // Internal link.
  if (_source.source === "faq" || _source.source === "code_bfc") {
    return (
      <Link route="index" params={{ type: "questions", id: _id }}>
        <a className="search-results-link">{body}</a>
      </Link>
    );
  }

  // External link.
  return (
    <a
      href={_source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="search-results-link"
    >
      {body}
    </a>
  );
};

const ResultsWrapper = styled.div`
  margin-top: 20px;
`;

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
      <ResultsWrapper className="search-results">
        <ResultsContainer data={data.hits.hits} />
        <SeeAlso />
        <FeedbackForm query={query} />
      </ResultsWrapper>
    );
  }
}

export default SearchResults;
