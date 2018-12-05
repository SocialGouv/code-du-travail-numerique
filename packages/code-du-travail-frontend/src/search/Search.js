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
    query: "",
    // query to display the search results
    queryResults: "",
    facet: "",
    coord: null,
    excludeSources: "",
    suggestions: [],
    results: []
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
      facet: this.props.router.query.facet,
      coord: coord,
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
      this.setState({ queryResults: this.state.query, coord: null });
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

  onSelect = (suggestion, event) => {
    // prevent onSubmit to be call
    event.preventDefault();
    const { query, facet } = this.state;
    if (facet === "annuaire") {
      const [lon, lat] = suggestion._source.coord;
      Router.pushRoute("index", {
        q: suggestion._source.title,
        coord: `${lon}:${lat}`,
        facet
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
    const { facet, excludeSources } = this.state;
    const asyncSearchResult =
      facet === "annuaire"
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
      facet,
      coord,
      suggestions
    } = this.state;

    const queryResultsComponent =
      facet === "annuaire" ? (
        <AddressQuery query={queryResults} coord={coord} />
      ) : (
        <SearchQuery
          query={queryResults}
          excludeSources={excludeSources}
          fetch={searchResults}
        />
      );

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
              <form
                id="search"
                className="search__form"
                onSubmit={this.onFormSubmit}
              >
                <div className="search__fields">
                  <label className="search__facets" htmlFor="contentSource">
                    <span id="contentSource" className="hidden">
                      Filtrer par type de contenu
                    </span>
                    <ReponseIcon className="facet-icon" />
                    <select
                      id="contentSource"
                      className="facet-value"
                      onChange={this.onChange}
                      onBlur={this.onChange}
                      value={facet}
                      name="facet"
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
                    placeholder="exemple: je travaille dans l'industrie chimique et n'ai pas eu de contrat de travail est-ce normal? "
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
