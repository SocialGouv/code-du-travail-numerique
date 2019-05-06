import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactPiwik from "react-piwik";
import { withRouter } from "next/router";
import { Container, theme, Button } from "@cdt/ui";

import { Router } from "../../routes";
import { searchAddress } from "../annuaire/adresse.service";
import ReponseIcon from "../icons/ReponseIcon";
import SearchIcon from "../icons/SearchIcon";
import { getExcludeSources } from "../sources";
import { DocumentSuggester } from "./DocumentSuggester";
import { suggestResults } from "./search.service";
import { withClipboard } from "../common/withClipboard.hoc";

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
      ReactPiwik.push(["trackSiteSearch", this.state.query, this.state.source]);
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
    const { source, query } = this.state;
    if (source === "annuaire") {
      const [lon, lat] = suggestion._source.coord;
      ReactPiwik.push(["trackEvent", "selectedSource", source]);
      Router.pushRoute("annuaire", {
        q: suggestion._source.title,
        coord: `${lon}:${lat}`,
        source
      });
      return;
    }
    ReactPiwik.push(["trackEvent", "selectedSuggestion", query, suggestion]);
    ReactPiwik.push(["trackSiteSearch", this.state.query, this.state.source]);
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
            <StyledSearch ref={this.searchRef}>
              <SearchLabel>
                Posez votre question sur le droit du travail
              </SearchLabel>
              <form className="search__form" onSubmit={this.onFormSubmit}>
                <div className="search__fields">
                  <SearchIconWithClipboard className="search__input__icon" />
                  <label className="search__sources" htmlFor="contentSource">
                    <span className="hidden">Filtrer par type de contenu</span>
                    <ReponseIcon className="search__sources__icon" />
                    <select
                      id="contentSource"
                      className="search__sources__value"
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
                <Button type="submit">Rechercher</Button>
              </form>
            </StyledSearch>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Search);

const { animations, box, breakpoints, colors, spacing, fonts } = theme;

const SearchLabel = styled.p`
  font-size: ${fonts.sizeH1};
  line-height: ${fonts.lineHeight};
  color: ${colors.title};
`;

const StyledSearch = styled.div`
  position: relative;
  padding: ${spacing.base} 0;
  text-align: center;

  .search__form {
    display: flex;
    margin: 0 auto;
    padding: var(--spacing-small) 0;
    position: relative;
    height: 5rem;
    width: 90%;
    & button {
      margin-left: ${spacing.xsmall};
    }
  }

  .search__fields {
    display: flex;
    flex: 1 1 auto;
    position: relative;
  }

  .search__input__icon {
    position: absolute;
    left: 0;
    top: 0;
    padding: ${spacing.medium} 0 0 ${spacing.medium};
    width: 2.55rem;
  }

  .search__sources {
    display: flex;
    position: absolute;
    right: 0;
    margin: ${spacing.small};
    align-items: center;
    background-color: ${colors.lighterGrey};
    border: none;
    border-radius: ${box.borderRadius};
  }

  .search__sources__icon {
    position: absolute;
    margin: 0 calc(${spacing.medium} / 2);
    width: 1.25rem;
    height: 1.25rem;
  }

  .search__sources__value {
    padding: ${spacing.xsmall} ${spacing.large} ${spacing.xsmall}
      ${spacing.larger};
    color: ${colors.almostBlack};
    background-color: transparent;
    background-position: top 1rem right 0.75em;
    border: 1px solid transparent;
  }

  .search__input {
    margin: 0;
    padding: 0 12.8rem 0 4rem;
    height: 100%;
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    line-height: calc(3.625rem - 1px);
    color: inherit;
    appearance: none;
    background: ${colors.lightBackground};
    border: 1px solid ${colors.elementBorder};
    border-radius: ${box.borderRadius};
    transition: border ${animations.transitionTiming} ease;
  }

  .search__input:focus {
    border-color: ${colors.blueLight};
    outline: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    .search__sources {
      display: none;
    }
    .search__input {
      padding-right: ${spacing.base};
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    .search__form {
      flex-direction: column;
      height: auto;
      & button {
        margin-left: 0;
      }
    }
    .search__input__icon {
      display: none;
    }
    .search__fields {
      margin-bottom: ${spacing.xsmall};
    }
    .search__input {
      padding: ${spacing.base};
    }
  }
`;
