import React from "react";
import styled from "styled-components";


const NoResultContainer = styled.div`margin-top: 20px;`;

class NoResult extends React.Component {
  render() {
    const source = this.props.source;
    return (
      <NoResultContainer className="notification error">
        <p>Pas de résultat dans {source}.</p>
      </NoResultContainer>
    )
  }
}


class ResultsCodeDuTravailContainer extends React.Component {

  render() {
    let data = this.props.data;
    if (data.hits.total === 0) {
      return (<NoResult source={'le Code du travail'}></NoResult>);
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

    let tags = data._source.tags[0].split('/').join(' > ').substring(2);

    let legifranceBaseUrl = 'https://www.legifrance.gouv.fr/affichCodeArticle.do';
    let legifranceUrl = `${legifranceBaseUrl}?idArticle=${data._source.id}&cidTexte=${data._source.cid}`;

    let excerpt = ''
    let source = null

    if (data.highlight) {
      let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
      excerpt = data.highlight[firstHighlightObjectKeyName][0]; // Use 1st available highlight.
      if (firstHighlightObjectKeyName.includes('tags')) {
        source = (<p><i>Trouvé dans les tags :</i></p>)
      } else if (firstHighlightObjectKeyName.includes('bloc_textuel')) {
        source = (<p><i>Trouvé dans le texte :</i></p>)
        excerpt += '…';
      }
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>
            {data._source.titre} - <span>{tags}</span>
          </h1>
        </header>
        {source}
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
      return (<NoResult source={'les fiches Service Public'}></NoResult>);
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

    let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
    let excerpt = data.highlight[firstHighlightObjectKeyName][0] + '…'; // Use 1st available highlight.

    let source = null
    if (firstHighlightObjectKeyName.includes('title')) {
      source = (<p><i>Trouvé dans le titre :</i></p>)
    } else if (firstHighlightObjectKeyName.includes('text')) {
      source = (<p><i>Trouvé dans le texte :</i></p>)
    } else if (firstHighlightObjectKeyName.includes('sous_theme')) {
      source = (<p><i>Trouvé dans le thème :</i></p>)
    } else if (firstHighlightObjectKeyName.includes('tags')) {
      source = (<p><i>Trouvé dans les tags :</i></p>)
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.title}</h1>
        </header>
        {source}
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
      return (<NoResult source={'la FAQ'}></NoResult>);
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

    let firstHighlightObjectKeyName = Object.keys(data.highlight)[0]
    let excerpt = data.highlight[firstHighlightObjectKeyName][0] + '…'; // Use 1st available highlight.

    let source = null
    if (firstHighlightObjectKeyName.includes('question')) {
      source = (<p><i>Trouvé dans la question :</i></p>)
    } else if (firstHighlightObjectKeyName.includes('reponse')) {
      source = (<p><i>Trouvé dans la réponse :</i></p>)
    }

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.question}</h1>
        </header>
        {source}
        <blockquote className="text-quote" dangerouslySetInnerHTML={{__html:excerpt}}></blockquote>
      </article>
    )
  }

}


const ResultsContainer = styled.div`text-align: left; margin-top: 20px;`;

class SearchResults extends React.Component {

  render() {

    let data = this.props.data;

    // No query.
    if (!data) {
      return null;
    }

    return (
      <ResultsContainer className="search-results">
        <ResultsCodeDuTravailContainer data={data.code_du_travail.results} />
        <ResultsFaqContainer data={data.faq.results} />
        <ResultsFichesServicePublicContainer data={data.fiches_service_public.results} />
      </ResultsContainer>
    );

  }

}

export default SearchResults;
