import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Container } from "@cdt/ui";

import { Router } from "../../routes";
import { searchAddress } from "../annuaire/adresse.service";
import ReponseIcon from "../icons/ReponseIcon";
import SearchIcon from "../icons/SearchIcon";
import { getExcludeSources } from "../sources";
import { DocumentSuggester } from "./DocumentSuggester";
import { suggestResults } from "./search.service";
import { withClipboard } from "../common/withClipboard.hoc";

const FormSearchButton = () => (
  <button type="submit" className="btn">
    Rechercher
  </button>
);

const suggestMaxResults = 5;

const SearchIconWithClipboard = withClipboard(SearchIcon);

class Search extends React.Component {
  static propTypes = {
    router: PropTypes.object
  };

  state = {
    // query in the input box
    query: this.props.router.query.q || "",
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
        query: this.props.router.query.q
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
      excludeSources: getExcludeSources(this.props.router.query.source || "")
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
      const routeName =
        this.state.source === "annuaire" ? "annuaire" : "recherche";

      Router.pushRoute(routeName, {
        q: this.state.query,
        source: this.state.source
      });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.submitQuery();
  };

  onChange = (event, { newValue } = {}) => {
    switch (event.target.name) {
      case "query":
        this.setState({
          query: newValue
        });
        return;
      case "source":
        this.setState({
          source: event.target.value,
          excludeSources: getExcludeSources(event.target.value)
        });
        if (this.state.query) {
          const routeName =
            event.target.value === "annuaire" ? "annuaire" : "recherche";
          Router.pushRoute(routeName, {
            q: this.state.query,
            source: event.target.value
          });
        }
    }
  };

  onSelect = (suggestion, event) => {
    // prevent onSubmit to be call
    event.preventDefault();
    const { source } = this.state;
    if (source === "annuaire") {
      const [lon, lat] = suggestion._source.coord;
      Router.pushRoute("annuaire", {
        q: suggestion._source.title,
        coord: `${lon}:${lat}`,
        source
      });
      return;
    }

    Router.pushRoute("recherche", { q: suggestion, source });
  };

  onClear = () => {
    this.setState({ suggestions: [] });
  };

  onSearch = ({ value }) => {
    const { source } = this.state;
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
        : suggestResults(value).then(items =>
            items.slice(0, suggestMaxResults)
          );

    asyncSearchResult
      .then(results => {
        this.setState({ suggestions: results });
      })
      .catch(error => {
        console.error("fetch error", error);
      });
  };

  render() {
    const { query, source, suggestions } = this.state;

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
                  <SearchIconWithClipboard className="search__input__icon" />
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
      </React.Fragment>
    );
  }
}

export default withRouter(Search);
