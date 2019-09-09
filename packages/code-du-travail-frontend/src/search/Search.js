import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Container,
  theme,
  Section,
  ScreenReaderOnly
} from "@cdt/ui-old";

import { searchAddress } from "../annuaire/adresse.service";
import ReponseIcon from "../icons/ReponseIcon";
import SearchIcon from "../icons/SearchIcon";
import { getExcludeSources } from "../sources";
import { DocumentSuggester } from "./DocumentSuggester";
import { suggestResults } from "./search.service";
import { withClipboard } from "../common/withClipboard.hoc";
import { matopush } from "../piwik";

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
      const source = this.props.router.query.source || "";
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
      source: this.props.router.query.source || "",
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
        this.state.source === "annuaire" ? "/annuaire" : "/recherche";
      Router.push({
        pathname: routeName,
        query: {
          q: this.state.query,
          source: this.state.source
        }
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
        if (this.state.source === event.target.value) {
          return;
        }
        this.setState({
          source: event.target.value,
          excludeSources: getExcludeSources(event.target.value)
        });
        if (this.state.query) {
          const routeName =
            event.target.value === "annuaire" ? "/annuaire" : "/recherche";
          Router.push({
            pathname: routeName,
            query: {
              q: this.state.query,
              source: event.target.value
            }
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
      matopush(["trackEvent", "selectedSource", source]);
      Router.push({
        pathname: "/annuaire",
        query: {
          q: suggestion._source.title,
          coord: `${lon}:${lat}`,
          source
        }
      });
      return;
    }
    matopush(["trackEvent", "selectedSuggestion", query, suggestion]);
    Router.push({
      pathname: "/recherche",
      query: { q: suggestion, source }
    });
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
                title: `${item.properties.name}, ${item.properties.postcode} ${item.properties.city}`,
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
        <SearchSection variant="white">
          <Container>
            <StyledSearch ref={this.searchRef}>
              <SearchLabel>
                Posez votre question sur le droit du travail
                <br />
                <Link href="/droit-du-travail" passHref>
                  <A>Le droit du travail, c‘est quoi ?</A>
                </Link>
              </SearchLabel>
              <SearchForm onSubmit={this.onFormSubmit}>
                <SearchInputIcon />
                <SearchInput
                  onChange={this.onChange}
                  query={query}
                  placeholder="Recherche"
                  onSearch={this.onSearch}
                  onSelect={this.onSelect}
                  onClear={this.onClear}
                  suggestions={suggestions}
                />
                <SearchSources htmlFor="contentSource">
                  <ScreenReaderOnly type={"inline"}>
                    Filtrer par type de contenu
                  </ScreenReaderOnly>
                  <SearchSourcesIcon />
                  <SearchSourcesValue
                    id="contentSource"
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
                  </SearchSourcesValue>
                </SearchSources>
                <Submit type="submit">Rechercher</Submit>
              </SearchForm>
            </StyledSearch>
          </Container>
        </SearchSection>
      </React.Fragment>
    );
  }
}

export default withRouter(Search);

const { animations, box, breakpoints, colors, spacing, fonts } = theme;

const SearchSection = styled(Section)`
  box-shadow: 0 10px 10px -10px ${colors.lightGrey};
  @media print {
    display: none;
  }
`;

const SearchLabel = styled.p`
  margin-top: 0;
  font-size: ${fonts.sizeH2};
  line-height: ${fonts.lineHeight};
  color: ${colors.title};
`;

const A = styled.a`
  font-size: ${fonts.sizeBase};
`;

const StyledSearch = styled.div`
  position: relative;
  padding: ${spacing.base} 0;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 0;
  position: relative;
  width: 90%;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
  }
`;

const SearchInputIcon = styled(SearchIconWithClipboard)`
  position: absolute;
  left: 0;
  top: 0;
  margin: ${spacing.base} 0 0 ${spacing.medium};
  width: 1.3rem;
  height: 1.3rem;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled(DocumentSuggester)`
  display: flex;
  margin: 0;
  padding: 0 ${spacing.base} 0 4rem;
  width: 100%;
  height: 50px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  appearance: none;
  background: ${colors.lightBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  transition: border ${animations.transitionTiming} ease;
  &:focus {
    border-color: ${colors.blueLight};
    outline: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: 50px;
    padding: 0 ${spacing.base};
  }
`;

const SearchSources = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: ${spacing.xsmall};
  background-color: ${colors.lighterGrey};
  border: none;
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const SearchSourcesIcon = styled(ReponseIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 1.25rem;
  height: 1.25rem;
  transform: translate(50%, -50%);
`;

const SearchSourcesValue = styled.select`
  padding-left: ${spacing.larger};
  color: ${colors.almostBlack};
  background-color: transparent;
  border: 1px solid transparent;
`;

const Submit = styled(Button)`
  margin-left: ${spacing.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
    margin-top: ${spacing.small};
  }
`;
