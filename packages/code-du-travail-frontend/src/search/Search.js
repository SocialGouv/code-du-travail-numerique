import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "p-debounce";
import { Container } from "@cdt/ui";

import AsyncFetch from "../lib/AsyncFetch";
import Suggester from "./Suggester";
import SearchResults from "./SearchResults";

import { Router, Link } from "../../routes";
import ReponseIcon from "../icons/ReponseIcon";
import { getExcludeSources } from "../sources";

const Disclaimer = () => (
  <div className="wrapper-narrow">
    <p>
      Ce service public vous permet d&apos;obtenir des réponses détaillées, des
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
        L&apos;ouverture officielle du site est prévue pour 2020.
      </a>
    </p>
  </div>
);

const FormSearchButton = () => (
  <button type="submit" className="btn btn__img btn__img__search">
    <span className="hidden">Rechercher</span>
  </button>
);

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchResults = (query, endPoint = "search", excludeSources) => {
  const url = `${API_URL}/${endPoint}?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;

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
  static propTypes = {
    query: PropTypes.string,
    excludeSources: PropTypes.string,
    render: PropTypes.func
  };

  static defaultProps = {
    query: "",
    excludeSources: "",
    render: ({ status, result, query }) => (
      <div>
        <div style={{ textAlign: "center" }}>
          {status === "loading" ? "..." : " "}
        </div>
        <div>
          {status === "success" &&
            result && <SearchResults query={query} data={result} />}
        </div>
      </div>
    )
  };

  shouldComponentUpdate(nextProps) {
    // prevent useless re-renders
    if (
      nextProps.query === this.props.query &&
      nextProps.excludeSources === this.props.excludeSources
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { query, excludeSources, render } = this.props;
    return (
      <AsyncFetch
        autoFetch={true}
        fetch={() => fetchResultsSearch(query, excludeSources)}
        render={args => render({ ...args, query })}
      />
    );
  }
}

class Search extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    onResults: PropTypes.func
  };

  state = {
    // query in the input box
    query: "",
    // query to display the search results
    queryResults: "",
    facet: "",
    excludeSources: ""
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
    if (this.props.router.query.facet) {
      const facet = this.props.router.query.facet;
      const excludeSources = getExcludeSources(facet);
      this.setState({ facet, excludeSources });
    }
    // listen to route changes
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }
  handleRouteChange = () => {
    // when route change, ensure to update the input box
    //console.log("handleRouteChange", url);
    this.setState({
      query: this.props.router.query.q,
      facet: this.props.router.query.facet,
      excludeSources: getExcludeSources(this.props.router.query.facet || ""),
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
      Router.pushRoute("index", {
        q: this.state.query,
        facet: this.state.facet
      });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.submitQuery();
  };

  onChange = event => {
    if (event.target.keyCode === 13) {
      this.submitQuery();
      return;
    }

    if (event.target.name === "facet") {
      Router.pushRoute("index", {
        q: this.state.query,
        facet: event.target.value
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };
  setResults = results => {
    if (this.props.onResults && results && results.hits.total > 0) {
      this.props.onResults(results.hits.hits);
    }
  };

  render() {
    const { query, queryResults, excludeSources, facet } = this.state;
    return (
      <SearchView
        onChange={this.onChange}
        onFormSubmit={this.onFormSubmit}
        query={query}
        facet={facet}
        queryResults={queryResults}
        onResults={this.setResults}
        excludeSources={excludeSources}
      />
    );
  }
}

const SearchView = ({
  onChange,
  onFormSubmit,
  query,
  facet,
  queryResults,
  onResults,
  excludeSources = ""
}) => {
  return (
    <React.Fragment>
      <div className="section-white shadow-bottom search-widget">
        <Container>
          <div className="search" style={{ padding: "1em 0" }}>
            <header>
              <h1 className="no-margin">
                Posez votre question sur le droit du travail
              </h1>
              <Disclaimer />
            </header>
            <form className="search__form" onSubmit={onFormSubmit}>
              <div className="search__fields">
                <label className="search__facets" htmlFor="contentSource">
                  <span id="contentSource" className="hidden">
                    Filtrer par type de contenu
                  </span>
                  <ReponseIcon className="facet-icon" />
                  <select
                    id="contentSource"
                    className="facet-value"
                    onChange={onChange}
                    onBlur={onChange}
                    value={facet}
                    name="facet"
                  >
                    <option value="">Tous contenus</option>
                    <option value="faq">Réponses</option>
                    <option value="code_du_travail">Code du travail</option>
                    <option value="fiches">Fiches</option>
                    <option value="modeles_de_courriers">Modèles</option>
                    <option value="outils">Outils</option>
                  </select>
                </label>
                <Suggester
                  onChange={onChange}
                  query={query}
                  excludeSources={excludeSources}
                  getResults={() =>
                    fetchResultsSuggest(query, excludeSources).then(results => {
                      onResults(results);
                      return results;
                    })
                  }
                />
              </div>
              <FormSearchButton />
            </form>
          </div>
        </Container>
      </div>
      {(queryResults && (
        <SearchQuery query={queryResults} excludeSources={excludeSources} />
      )) ||
        null}
    </React.Fragment>
  );
};
SearchView.propTypes = {
  query: PropTypes.string,
  queryResults: PropTypes.string,
  facet: PropTypes.string,
  excludeSources: PropTypes.string,
  onChange: PropTypes.func,
  onResults: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func
};
const _Search = withRouter(Search);

export default _Search;
