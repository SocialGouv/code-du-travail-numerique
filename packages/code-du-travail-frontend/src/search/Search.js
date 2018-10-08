import memoizee from "memoizee";
import React from "react";
import { Container } from "@socialgouv/code-du-travail-ui";
import { withRouter } from "next/router";
import debounce from "lodash.debounce";

import AsyncFetch from "../lib/AsyncFetch";
import Suggester from "./Suggester";
import SearchResults from "./SearchResults";

import { Router, Link } from "../../routes";

const Disclaimer = () => (
  <div className="wrapper-narrow">
    <p>
      Ce service public vous permet d’obtenir des réponses détaillées, des
      fiches explicatives et les articles de loi correspondants -{" "}
      <Link route="about">
        <a>En savoir plus</a>
      </Link>
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
  </div>
);

const fetchResults = (query, endPoint = "search") => {
  const url = `${process.env.API_URL}/${endPoint}?q=${query}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Un problème est survenu.");
  });
};

// memoize search results
const fetchResultsSearch = memoizee(
  query => {
    return fetchResults(query, "search");
  },
  { promise: true }
);

const fetchResultsSuggestDebounced = debounce(
  query => fetchResults(query, "suggest"),
  200
);

// memoize suggestions results
const fetchResultsSuggest = memoizee(
  query =>
    (query && query.length > 2 && fetchResultsSuggestDebounced(query)) ||
    Promise.resolve(),
  { promise: true }
);

export class SearchQuery extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.query === this.props.query) {
      return false;
    }
    return true;
  }
  render() {
    const { query, render, router, filters } = this.props;
    return (
      <AsyncFetch
        autoFetch={true}
        fetch={() => fetchResultsSearch(query)}
        render={args => render({ ...args, query, filters })}
      />
    );
  }
}

SearchQuery.defaultProps = {
  render: ({ status, result, clear, query, filters }) => (
    <div>
      <div style={{ textAlign: "center" }}>
        {status === "loading" ? "..." : " "}
      </div>
      <div>
        {status === "success" &&
          result && (
            <SearchResults filters={filters} query={query} data={result} />
          )}
      </div>
    </div>
  )
};

const _SearchQuery = withRouter(SearchQuery);

// we do some serious nlp here
// TODO: use classifiers :)
// detect branche
// detect theme
// detect region
const guessTagsFromQuery = query => {
  const tags = {};
  if (!query) {
    return tags;
  }
  if (query.match("convention collective")) {
    tags.source = "idcc";
  }
  if (query.match("salaire")) {
    tags.theme = "salaire";
  }
  if (query.match("metallurgie")) {
    tags.branche = "metallurgie";
  }
  if (query.match("boulangerie")) {
    tags.branche = "boulangerie";
  }
  if (query.match("contrat de travail")) {
    tags.theme = "contrat de travail";
  }

  return tags;
};

/**
handle search state

here we keep state for :
 - the `query` inside the autosuggest input
 - the `resultsQuery` that is used to display the result list

We sync to the router to update the search box and results when the url asks it with a `?query=search` param.
*/

class Search extends React.Component {
  state = {
    // query in the input box
    query: "",
    // query to display the search results
    resultsQuery: ""
  };
  componentDidMount() {
    // when coming on this page with a ?q param
    if (this.props.router.query.q) {
      this.setState({
        query: this.props.router.query.q,
        resultsQuery: this.props.router.query.search
          ? this.props.router.query.search === "0" && ""
          : this.props.router.query.q
      });
    }
    // listen to route changes
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }
  handleRouteChange = () => {
    // when route change, ensure to update the input box state
    this.setState({
      query: this.props.router.query.q,
      resultsQuery: this.props.router.query.search
        ? this.props.router.query.search === "0" && ""
        : this.props.router.query.q
    });
  };
  componentWillUnmount() {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }
  submitQuery = () => {
    if (this.state.query) {
      this.setState({ resultsQuery: this.state.query });
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
    const { query, resultsQuery } = this.state;
    const filters = guessTagsFromQuery(resultsQuery);

    return (
      <SearchView
        filters={filters}
        query={query}
        resultsQuery={resultsQuery}
        onChange={this.onChange}
        onSubmit={this.onFormSubmit}
      />
    );
  }
}

/*
  SearchBox + Results
*/
const SearchView = ({ query, resultsQuery, onChange, onSubmit, filters }) => (
  <div>
    <div className="section-white shadow-bottom">
      <Container>
        <div className="search" style={{ padding: "1em 0" }}>
          <header>
            <h1 className="no-margin">
              Posez votre question sur le droit du travail
            </h1>
            <Disclaimer />
          </header>
          <form className="search__form" onSubmit={onSubmit}>
            <Suggester
              onChange={onChange}
              query={query}
              getResults={() => fetchResultsSuggest(query)}
            />
            <button type="submit" className="btn btn__img btn__img__search">
              <span className="hidden">Rechercher</span>
            </button>
          </form>
        </div>
      </Container>
    </div>
    {(resultsQuery && (
      <_SearchQuery filters={filters} query={resultsQuery} />
    )) ||
      null}
  </div>
);

const _Search = withRouter(Search);

export default _Search;
