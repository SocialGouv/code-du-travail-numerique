import React from "react";
import styled from "styled-components";


const NoResultContainer = styled.div`margin-top: 20px;`;

const NoResult = () => (
  <NoResultContainer className="notification error">
    <p>Pas de résultat.</p>
  </NoResultContainer>
);


class Result extends React.Component {

  render() {

    let data = this.props.data;

    let tags = data._source.tags[0].split('/').join(' > ').substring(2);

    let legifranceBaseUrl = 'https://www.legifrance.gouv.fr/affichCodeArticle.do';
    let legifranceUrl = `${legifranceBaseUrl}?idArticle=${data._source.id}&cidTexte=${data._source.cid}`;

    let article = data._source.bloc_textuel;
    if (data.highlight) {
      article = data.highlight.bloc_textuel[0];
    }
    let trailingBrRegex = /^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi;
    article = article.replace(trailingBrRegex, '');

    return (
      <article key={data._id} className={data._type}>
        <header>
          <h1>{data._source.titre}</h1>
          <p>{tags}</p>
        </header>
        <blockquote dangerouslySetInnerHTML={{__html:article}}></blockquote>
        <footer>
          <a href={legifranceUrl} target="_blank" rel="noopener noreferrer">Voir sur Legifrance</a>
        </footer>
      </article>
    )

  }

}


const ResultsContainer = styled.div`text-align: left;`;

class SearchResults extends React.Component {

  render() {

    const data = this.props.data;

    // No query.
    if (!data) {
      return null;
    }

    // No results for query.
    if (data.hits.total === 0) {
      return (<NoResult></NoResult>);
    }

    return (
      <ResultsContainer>
        <p>Environ {data.hits.total} résultats ({data.took / 1000} secondes)</p>
        {data.hits.hits.map(result => <Result data={result} />)}
      </ResultsContainer>
    );

  }

}

export default SearchResults;
