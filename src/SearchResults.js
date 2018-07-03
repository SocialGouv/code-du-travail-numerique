import React from "react";
import styled from "styled-components";

import FaqModal from "./FaqModal.js";
import FeedbackForm from "./FeedbackForm.js";


const NoResultContainer = styled.div`margin-top: 20px;`;

class NoResult extends React.Component {
  render() {
    return (
      <NoResultContainer className="notification error">
        <p>{this.props.text}.</p>
      </NoResultContainer>
    )
  }
}


class ResultsCodeDuTravailContainer extends React.Component {

  render() {
    let data = this.props.data;
    if (data.hits.total === 0) {
      return (<NoResult text={'Pas de résultat dans le Code du travail'}></NoResult>);
    }
    return (
      <div>
        <div className="search-title">
          <h1>Résultats dans le <em>Code du travail</em></h1>
        </div>
        {data.hits.hits.map(result => <ResultCodeDuTravail key={result['_id']} data={result} />)}
      </div>
    )
  }

}

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


class ResultsFichesServicePublicContainer extends React.Component {

  render() {
    let data = this.props.data;
    if (data.hits.total === 0) {
      return (<NoResult text={'Pas de résultat dans les fiches Service Public'}></NoResult>);
    }
    return (
      <div>
        <div className="search-title">
          <h1>Résultats dans les <em>fiches Service Public</em></h1>
        </div>
        {data.hits.hits.map(result => <ResultFicheServicePublic key={result['_id']} data={result} />)}
      </div>
    )
  }

}

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


class ResultsFaqContainer extends React.Component {

  render() {
    let data = this.props.data;
    if (data.hits.total === 0) {
      return (<NoResult text={'Pas de résultat dans la FAQ'}></NoResult>);
    }
    return (
      <div>
        <div className="search-title">
          <h1>Résultats dans la <em>FAQ</em></h1>
        </div>
        {data.hits.hits.map(result => <ResultFaq key={result['_id']} data={result} />)}
      </div>
    )
  }

}

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
          <FaqModal text="Voir toute la réponse" question={data._source.question}></FaqModal>
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

    return (
      <ResultsContainer className="search-results">
        <ResultsFaqContainer data={data.faq.results} />
        <ResultsFichesServicePublicContainer data={data.fiches_service_public.results} />
        <ResultsCodeDuTravailContainer data={data.code_du_travail.results} />
        <FeedbackForm query={query} />
      </ResultsContainer>
    );

  }

}

export default SearchResults;
