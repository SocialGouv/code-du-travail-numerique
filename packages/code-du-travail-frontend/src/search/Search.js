import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "p-debounce";
import { Container } from "@cdt/ui";

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

const FormSearchButton = () => (
  <button type="submit" className="btn btn__img btn__img__search">
    <span className="hidden">Rechercher</span>
  </button>
);

const memoFetch = memoizee(
  url =>
    fetch(url).then(r => {
      if (r.status === 200) {
        return r.json();
      } else {
        return Promise.reject("Un problème est survenu.");
      }
    }),
  {
    promise: true
  }
);

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchResults = (query, endPoint = "search", excludeSources) => {
  let urlParams = new URLSearchParams();
  urlParams.append("q", query);
  if (excludeSources) {
    urlParams.append("excludeSources", excludeSources);
  }
  const url = `${API_URL}/${endPoint}?${urlParams.toString()}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Un problème est survenu.");
  });
};

// memoize search results
const fetchResultsSearch = memoizee(
  (query, excludeSources) => {
    return fetchResults(query, "search", excludeSources);
  },
  { promise: true }
);

const fetchResultsSuggestDebounced = pDebounce(
  (query, excludeSources) => fetchResults(query, "suggest", excludeSources),
  200
);

// memoize suggestions results
const fetchResultsSuggest = memoizee(
  (query, excludeSources) =>
    (query &&
      query.length > 2 &&
      fetchResultsSuggestDebounced(query, excludeSources)) ||
    Promise.resolve(),
  { promise: true }
);

export class SearchQuery extends React.Component {
  shouldComponentUpdate(nextProps) {
    // prevent useless re-renders
    if (nextProps.query === this.props.query) {
      return false;
    }
    return true;
  }
  render() {
    const { query, excludeSources, render, filters } = this.props;
    return (
      <AsyncFetch
        autoFetch={true}
        fetch={() => fetchResultsSearch(query, excludeSources)}
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

// todo: externalize state management
class Search extends React.Component {
  state = {
    // query in the input box
    query: "",
    // query to display the search results
    queryResults: ""
  };
  componentDidMount() {
    // when coming on this page with a ?q param
    if (this.props.router.query.q) {
      this.setState({
        query: this.props.router.query.q,
        queryResults: this.props.router.query.search
          ? this.props.router.query.search === "0" && ""
          : this.props.router.query.q
      });
    }
    // listen to route changes
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }
  handleRouteChange = url => {
    // when route change, ensure to update the input box
    //console.log("handleRouteChange", url);
    this.setState({
      query: this.props.router.query.q,
      queryResults: this.props.router.query.search
        ? this.props.router.query.search === "0" && ""
        : this.props.router.query.q
    });
  };
  componentWillUnmount() {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }
  submitQuery = () => {
    if (this.state.query) {
      this.setState({ queryResults: this.state.query });
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
    const { query, queryResults } = this.state;
    return (
      <SearchView
        onChange={this.onChange}
        onFormSubmit={this.onFormSubmit}
        query={query}
        queryResults={queryResults}
      />
    );
  }
}

const SearchView = ({ onChange, onFormSubmit, query, queryResults }) => (
  <React.Fragment>
    <div className="section-white shadow-bottom">
      <Container>
        <div className="search" style={{ padding: "1em 0" }}>
          <header>
            <h1 className="no-margin">
              Posez votre question sur le droit du travail
            </h1>
            <Disclaimer />
          </header>
          <form className="search__form" onSubmit={onFormSubmit}>
            <Suggester
              onChange={onChange}
              query={query}
              getResults={() => fetchResultsSuggest(query)}
            />
            <FormSearchButton />
          </form>
        </div>
      </Container>
    </div>
    {(queryResults && <SearchQuery query={queryResults} />) || null}
  </React.Fragment>
);

const _Search = withRouter(Search);

export default _Search;
