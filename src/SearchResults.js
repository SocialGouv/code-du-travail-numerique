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


const ResultsCodeDuTravailContainer = ({ data }) => (
  <div>
    {data.hits.hits.map(result => (
      <ResultCodeDuTravail key={result['_id']} data={result} />
    ))}
  </div>
);

class ResultCodeDuTravail extends React.Component {

  render() {

    let data = this.props.data;

    let legifranceBaseUrl = 'https://www.legifrance.gouv.fr/affichCodeArticle.do';
    let legifranceUrl = `${legifranceBaseUrl}?idArticle=${data._source.id}&cidTexte=${data._source.cid}`;

    let excerpt = ''
    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
      excerpt = data.highlight[firstHighlightObjectKeyName][0]; // Use 1st available highlight.
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
        <h1>{data._source.titre}</h1>
        </header>
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
        <footer>
          <a href={legifranceUrl} target="_blank" rel="noopener noreferrer">Voir sur Legifrance</a>
        </footer>
      </article>
    )

  }

}


const ResultsFichesMinistereTravailContainer = ({ data }) => (
  <div>
    {data.hits.hits.map(result => (
      <ResultFichesMinistereTravail key={result['_id']} data={result} />
    ))}
  </div>
);

class ResultFichesMinistereTravail extends React.Component {

  render() {
    let data = this.props.data;

    let excerpt = ''
    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
      excerpt = data.highlight[firstHighlightObjectKeyName][0] + '…'; // Use 1st available highlight.
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.title}</h1>
        </header>
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
        <footer>
          <a href={data._source.url} target="_blank" rel="noopener noreferrer">Voir sur Ministère du Travail</a>
        </footer>
      </article>
    )
  }

}


const ResultsFichesServicePublicContainer = ({ data }) => (
  <div>
    {data.hits.hits.map(result => (
      <ResultFicheServicePublic key={result['_id']} data={result} />
    ))}
  </div>
);

class ResultFicheServicePublic extends React.Component {

  render() {
    let data = this.props.data;

    let excerpt = ''
    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
      excerpt = data.highlight[firstHighlightObjectKeyName][0] + '…'; // Use 1st available highlight.
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.title}</h1>
        </header>
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
        <footer>
          <a href={data._source.url} target="_blank" rel="noopener noreferrer">Voir sur Service Public</a>
        </footer>
      </article>
    )
  }

}


const ResultsFaqContainer = ({ data }) => (
  <div>
    {data.hits.hits.map(result => (
      <ResultFaq key={result['_id']} data={result} />
    ))}
  </div>
);

class ResultFaq extends React.Component {

  render() {
    let data = this.props.data;

    let excerpt = ''
    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
      excerpt = data.highlight[firstHighlightObjectKeyName][0] + '…'; // Use 1st available highlight.
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.question}</h1>
        </header>
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
        <footer>
          <FaqModal text="Voir la réponse de la FAQ" question={data._source.question}></FaqModal>
        </footer>
      </article>
    )
  }

}


const ResultsContainer = styled.div`text-align: left; margin-top: 20px;`;

class SearchResults extends React.Component {

  render() {

    let data = this.props.data;
    let query = this.props.query;

    // No query.
    if (!data) {
      return null;
    }

    // No results.
    let hits = [
      data.faq.results.hits.total,
      data.fiches_service_public.results.hits.total,
      data.fiches_ministere_travail.results.hits.total,
      data.code_du_travail.results.hits.total,
    ]
    let hitsSum = hits.reduce((x, y) => x + y);
    if (!hitsSum) {
      return (<NoResult />)
    }

    return (
      <ResultsContainer className="search-results">
        <ResultsFaqContainer data={data.faq.results} />
        <ResultsFichesServicePublicContainer data={data.fiches_service_public.results} />
        <ResultsFichesMinistereTravailContainer data={data.fiches_ministere_travail.results} />
        <ResultsCodeDuTravailContainer data={data.code_du_travail.results} />
        <SeeAlso />
        <FeedbackForm query={query} />
      </ResultsContainer>
    );

  }

}

export default SearchResults;
