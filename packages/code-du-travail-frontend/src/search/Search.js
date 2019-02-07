import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Container } from "@cdt/ui";

import { searchAddress } from "../annuaire/adresse.service";
import { suggestResults, searchResults } from "./search.service";
import { DocumentSuggester } from "./DocumentSuggester";
import { SearchQuery } from "./SearchQuery";
import ReponseIcon from "../icons/ReponseIcon";

import { Router, Link } from "../../routes";
import { getRouteBySource, getExcludeSources } from "../sources";
import { AddressQuery } from "./AddressQuery";

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
    console.log("route change", { source: this.props.router.query.source });
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
                <Disclaimer />
              </header>
              <form className="search__form" onSubmit={this.onFormSubmit}>
                <div className="search__fields">
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
                    placeholder=""
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
