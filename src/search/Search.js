import * as nodeUrl from "url";
import memoize from "memoize-state";
import React from "react";
import { withRouter } from "next/router";
import { Alert, Section } from "@socialgouv/code-du-travail-ui";

import { Router } from "../../routes";
import api from "../../conf/api.js";
import SearchResults from "./SearchResults";

const Disclaimer = () => (
  <p>
    Ce site est <b>en cours de construction</b> : les données qui s'y trouvent
    peuvent être erronées ou imprécises.
    <br />
    <a
      target="_blank"
      className="external-link__after"
      rel="noopener noreferrer"
      href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
    >
      L'ouverture officielle du site est prévue pour 2020.
    </a>
  </p>
);

const SearchForm = ({ query, onChange, onKeyDown, onSubmit }) => (
  <form className="search__form" onSubmit={onSubmit}>
    <input
      aria-label="Posez votre question"
      className="search__input"
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Posez votre question"
      type="search"
      value={query}
    />
    <button type="submit" className="btn btn__img btn__img__search">
      <span className="hidden">Rechercher</span>
    </button>
  </form>
);

class Search extends React.Component {
  state = {
    query: "",
    data: null,
    error: null,
    pendingXHR: false
  };

  componentDidMount() {
    // A query already exists in the URL: route was accessed via direct URL.
    if (Router.query && Router.query.q) {
      this.fetchResults(decodeURI(Router.query.q));
    }
    Router.onRouteChangeStart = url => {
      return this.onRouteChange(url);
    };
  }

  onRouteChange = url => {
    url = nodeUrl.parse(url, true);
    let isRootSearchPage = url.pathname === "/";
    if (isRootSearchPage && url.query.q) {
      return this.fetchResults(decodeURI(url.query.q));
    } else if (isRootSearchPage) {
      return this.setState({ data: null, query: "" });
    }
  };

  urlReset = () => {
    // This will trigger the `onRouteChangeStart` listener.
    return Router.push({ pathname: "/" });
  };

  urlUpdate = query => {
    // This will trigger the `onRouteChangeStart` listener.
    return Router.push({ pathname: "/", query: { q: query } });
  };

  onFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      this.urlUpdate(encodeURI(this.state.query));
    }
  };

  onSearchInputChange = event => {
    let query = event.target.value;
    if (!query) {
      return this.urlReset();
    }
    this.setState({ query: query });
  };

  onKeyDown = event => {
    if (event.keyCode === 27) {
      return this.urlReset();
    }
  };

  // Memoize fetch calls (fetch returns a promise).
  memoizedFetch = memoize(
    query => {
      return fetch(`${api.BASE_URL}/search?q=${query}`).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(api.ERROR_MSG);
      });
    },
    { cacheSize: 40 }
  );

  fetchResults = query => {
    this.setState({ query, pendingXHR: true, error: null }, () => {
      this.memoizedFetch(query)
        .then(data => this.setState({ data, pendingXHR: false }))
        .catch(error => this.setState({ error, pendingXHR: false }));
    });
  };

  render() {
    const { data, error, pendingXHR, query } = this.state;
    // const { router } = this.props;
    // console.log({ data, error, pendingXHR, query });

    const xhrErrorJsx = error ? (
      <div className="section-light">
        <div className="container">
          <Alert danger>{error.message}</Alert>
        </div>
      </div>
    ) : null;

    const loadingJsx = pendingXHR ? (
      <p className="search__loading" role="alert" aria-live="assertive">
        Chargement…
      </p>
    ) : null;

    return (
      <div>
        <div className=" shadow-bottom">
          <Section light>
            <div className="search">
              <header>
                <h1 className="no-margin">
                  Posez votre question sur le droit du travail
                </h1>
                <Disclaimer />
              </header>
              <SearchForm
                query={query}
                onChange={this.onSearchInputChange}
                onKeyDown={this.onKeyDown}
                onSubmit={this.onFormSubmit}
              />
            </div>
          </Section>
        </div>
        {loadingJsx}
        {xhrErrorJsx}
        {data && <SearchResults data={data} query={query} />}
      </div>
    );
  }
}

export default withRouter(Search);
