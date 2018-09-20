import memoizee from "memoizee";
import React from "react";
import { withRouter } from "next/router";
import { Container } from "@socialgouv/code-du-travail-ui";

import Suggester from "./Suggester";
import SearchResults from "./SearchResults";

import { Router } from "../../routes";

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

const FormSearchButton = () => (
  <button
    type="submit"
    className="btn btn__img btn__img__search"
    style={{
      maxHeight: 36,
      flex: "1 0 38px"
    }}
  >
    <span className="hidden">Rechercher</span>
  </button>
);

// Memoize fetch calls (fetch returns a promise).
const fetchResults = (query, endPoint = "search") => {
  const url = `${process.env.API_URL}/${endPoint}?q=${query}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Un problème est survenu.");
  });
};

import AsyncFetch from "../lib/AsyncFetch";

const fetchResultsSearch = memoizee(
  query => {
    return fetchResults(query, "search");
  },
  { promise: true }
);

const fetchResultsSuggest = memoizee(
  query => {
    return fetchResults(query, "suggest");
  },
  { promise: true }
);

class Search extends React.Component {
  state = {
    query: "",
    submitQuery: ""
  };
  componentDidMount() {
    // A query already exists in the URL: route was accessed via direct URL.
    if (Router.query && Router.query.q) {
      this.setState({
        query: Router.query.q,
        submitQuery: Router.query.q
      });
    }
  }

  submitQuery = () => {
    if (this.state.query) {
      this.setState({ submitQuery: this.state.query });
      Router.push({
        pathname: "/",
        query: { q: this.state.query }
      });
    }
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.submitQuery();
  };

  onChange = e => {
    if (e.target.keyCode === 13) {
      this.submitQuery();
    } else {
      this.setState({ query: e.target.value });
    }
  };

  render() {
    const { query, submitQuery } = this.state;
    return (
      <div>
        <div className="shadow-bottom">
          <Container>
            <div className="search" style={{ padding: "1em 0" }}>
              <header>
                <h1 className="no-margin">
                  Posez votre question sur le droit du travail
                </h1>
                <Disclaimer />
              </header>
              <form className="search__form" onSubmit={this.onFormSubmit}>
                <Suggester
                  onChange={this.onChange}
                  query={query}
                  fetch={() => fetchResultsSuggest(query)}
                />
                <FormSearchButton />
              </form>
            </div>
          </Container>
        </div>
        {(submitQuery && (
          <AsyncFetch
            autoFetch={true}
            fetch={() => fetchResultsSearch(submitQuery)}
            render={({ status, result, clear }) => (
              <div>
                <div style={{ textAlign: "center" }}>
                  {status === "loading" ? "..." : ""}
                </div>
                <div>
                  {status === "success" &&
                    result && <SearchResults data={result} />}
                </div>
              </div>
            )}
          />
        )) ||
          null}
      </div>
    );
  }
}

export default withRouter(Search);
