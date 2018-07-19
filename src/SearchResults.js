import React from "react";
import styled from "styled-components";

import FaqModal from "./FaqModal.js";
import FeedbackForm from "./FeedbackForm.js";
import SeeAlso from "./SeeAlso";


const NoResultContainer = styled.div`margin-top: 20px;`;

const NoResult = ({ data }) => (
  <NoResultContainer className="notification error">
    <p>Nous n’avons pas trouvé de résultat pour votre recherche.</p>
  </NoResultContainer>
);


const ResultsContainer = ({ data }) => (
  <div>
    {data.map(result => (
      <Result key={result['_id']} data={result} />
    ))}
  </div>
);

class Result extends React.Component {

  render() {

    let data = this.props.data;

    let excerpt = '';
    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0];
      // Use the first `n` available highlights as excerpt.
      const numExcerpts = 3;
      excerpt = data.highlight[firstHighlightObjectKeyName].slice(0, numExcerpts).join(' … ');
    }

    let source;
    if (data._source.source === 'faq') {
      source = "Source : FAQ";
    } else if (data._source.source === 'code_du_travail') {
      source = "Source : Legifrance";
    } else if (data._source.source === 'fiches_service_public') {
      source = "Source : Service Public";
    } else if (data._source.source === 'fiches_ministere_travail') {
      source = "Source : Ministère du Travail";
    }

    let body = (
      <article key={data._id} className={data._source.source}>
        <header>
          <h1>{data._source.title}</h1>
        </header>
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
        <footer>{source}</footer>
      </article>
    )

    if (data._source.source === 'faq') {
      return (
        <FaqModal question={data._source.title}>
          {body}
        </FaqModal>
      )
    }

    return (
      <a
        href={data._source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="search-results-link">
          {body}
      </a>
    )

  }

}


const ResultsWrapper = styled.div`text-align: left; margin-top: 20px;`;

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
      return (<NoResult />)
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
