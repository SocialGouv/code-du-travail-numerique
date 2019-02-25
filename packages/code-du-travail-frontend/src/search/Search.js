import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Container } from "@cdt/ui";

import { Router } from "../../routes";
import { searchAddress } from "../annuaire/adresse.service";
import ReponseIcon from "../icons/ReponseIcon";
import SearchIcon from "../icons/SearchIcon";
import { getRouteBySource, getExcludeSources } from "../sources";
import { AddressQuery } from "./AddressQuery";
import { DocumentSuggester } from "./DocumentSuggester";
import { SearchQuery } from "./SearchQuery";
import { suggestResults, searchResults } from "./search.service";

const FormSearchButton = () => (
  <button type="submit" className="btn">
    Rechercher
  </button>
);

class Search extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    onResults: PropTypes.func
  };
  static defaultProps = {
    onResults: () => {}
  };
  state = {
    // query in the input box
    query: this.props.router.query.q || "",
    // query to display the search results
    queryResults: "",
    source: "",
    coord: null,
    excludeSources: "",
    suggestions: [],
    results: []
  };
  searchRef = React.createRef();

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
    if (this.props.router.query.source) {
      const source = this.props.router.query.source;
      const excludeSources = getExcludeSources(source);
      this.setState({ source, excludeSources });
    }
    if (this.props.router.query.coord) {
      const [lon, lat] = this.props.router.query.coord.split(":");
      this.setState({ coord: { lat, lon } });
    }
    // listen to route changes
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }
  handleRouteChange = () => {
    // when route change, ensure to update the input box
    let coord;
    if (this.props.router.query.coord) {
      const [lon, lat] = this.props.router.query.coord.split(":");
      coord = { lon, lat };
    }
    this.setState({
      query: this.props.router.query.q,
      source: this.props.router.query.source,
      coord: coord,
      excludeSources: getExcludeSources(this.props.router.query.source || ""),
      queryResults: this.props.router.query.search
        ? this.props.router.query.search === "0" && ""
        : this.props.router.query.q
    });

    if (this.searchRef.current) {
      this.searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  componentWillUnmount() {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }

  submitQuery = () => {
    if (this.state.query) {
      this.setState({ queryResults: this.state.query, coord: null });
      Router.pushRoute("index", {
        q: this.state.query,
        source: this.state.source
      });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.submitQuery();
  };

  onChange = event => {
    if (event.target.name === "source") {
      Router.pushRoute("index", {
        q: this.state.query,
        source: event.target.value
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  onSelect = (suggestion, event) => {
    // prevent onSubmit to be call
    event.preventDefault();
    const { query, source } = this.state;
    if (source === "annuaire") {
      const [lon, lat] = suggestion._source.coord;
      Router.pushRoute("index", {
        q: suggestion._source.title,
        coord: `${lon}:${lat}`,
        source
      });
      return;
    }

    const route = getRouteBySource(suggestion._source.source);
    const anchor = suggestion._source.anchor
      ? suggestion._source.anchor.slice(1)
      : undefined;
    Router.pushRoute(
      route,
      { q: query, search: 0, slug: suggestion._source.slug },
      { hash: anchor }
    );
  };

  onClear = () => {
    this.setState({ suggestions: [] });
  };

  onSearch = ({ value }) => {
    const { source, excludeSources } = this.state;
    const asyncSearchResult =
      source === "annuaire"
        ? searchAddress(value).then(results =>
            results.map(item => ({
              _source: {
                title: `${item.properties.name}, ${item.properties.postcode} ${
                  item.properties.city
                }`,
                coord: item.geometry.coordinates
              }
            }))
          )
        : suggestResults(value, excludeSources).then(
            results => results.hits.hits
          );

    asyncSearchResult
      .then(results => {
        this.setState({ suggestions: results }, () => {
          this.props.onResults(results);
        });
      })
      .catch(error => {
        console.error("fetch error", error);
      });
  };

  render() {
    const {
      query,
      queryResults,
      excludeSources,
      source,
      coord,
      suggestions
    } = this.state;

    const queryResultsComponent =
      source === "annuaire" ? (
        <AddressQuery query={queryResults} coord={coord} />
      ) : (
        <SearchQuery
          query={queryResults}
          source={source}
          excludeSources={excludeSources}
          fetch={searchResults}
        />
      );

    return (
      <React.Fragment>
        <div className="section-white shadow-bottom search-widget">
          <Container>
            <div
              className="search"
              ref={this.searchRef}
              style={{ padding: "1em 0" }}
            >
              <header>
                <h1 className="no-margin">
                  Posez votre question sur le droit du travail
                </h1>
                <br />
              </header>
              <form className="search__form" onSubmit={this.onFormSubmit}>
                <div className="search__fields">
                  <SearchIcon className="search__input__icon" />
                  <label className="search__sources" htmlFor="contentSource">
                    <span className="hidden">Filtrer par type de contenu</span>
                    <ReponseIcon className="select-sources__icon" />
                    <select
                      id="contentSource"
                      className="select-sources__value"
                      onChange={this.onChange}
                      onBlur={this.onChange}
                      value={source}
                      name="source"
                    >
                      <option value="">Tous contenus</option>
                      <option value="faq">Réponses</option>
                      <option value="code_du_travail">Code du travail</option>
                      <option value="fiches">Fiches</option>
                      <option value="modeles_de_courriers">Modèles</option>
                      <option value="outils">Outils</option>
                      <option value="annuaire">Annuaire</option>
                    </select>
                  </label>
                  <DocumentSuggester
                    onChange={this.onChange}
                    query={query}
                    placeholder="Recherche"
                    onSearch={this.onSearch}
                    onSelect={this.onSelect}
                    onClear={this.onClear}
                    suggestions={suggestions}
                    className="search__input"
                  />
                </div>
                <FormSearchButton />
              </form>
            </div>
          </Container>
        </div>
        {(queryResults && queryResultsComponent) || null}
      </React.Fragment>
    );
  }
}

export default withRouter(Search);
