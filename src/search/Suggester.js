import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

import AsyncFetch from "../lib/AsyncFetch";
import { Router } from "../../routes";

const getSuggestionValue = suggestion =>
  `${suggestion._source.source} > ${suggestion._source.title}`;

const ellipsisStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "90%",
  overflow: "hidden"
};

const getRouteBySource = source =>
  ({
    faq: "question",
    fiches_ministere_travail: "fiche-ministere-travail",
    fiches_service_public: "fiche-service-public"
  }[source]);

const getSourceName = source =>
  ({
    faq: "Question",
    fiches_ministere_travail: "Fiche Ministère du travail",
    fiches_service_public: "Fiche Service public"
  }[source]);

const cleanHtml = html =>
  html
    .trim()
    .replace(/^(<br\/?>)+/, "")
    .replace(/((<br\/?>)+)$/, "")
    .replace(/^(<p>)+/, "")
    .replace(/((<\/p>)+)$/, "");

const SuggestionContainer = styled.div`
  p {
    margin: 0;
  }
`;

const renderSuggestion = suggestion => (
  <SuggestionContainer style={ellipsisStyle}>
    <b>
      {getSourceName(suggestion._source.source)} | {suggestion._source.title}
    </b>
    <br />
    <div
      dangerouslySetInnerHTML={{
        __html: cleanHtml(
          (suggestion.highlight &&
            suggestion.highlight["all_text.french_exact"] &&
            suggestion.highlight["all_text.french_exact"][0]) ||
            ""
        )
      }}
    />
  </SuggestionContainer>
);

const SuggestionsContainer = styled.div`
  li[role="option"]:nth-child(2n + 1) {
    background: #f7f7f7;
  }
`;

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

const onSuggestionSelected = (e, suggestion) => {
  e.preventDefault();
  Router.pushRoute(getRouteBySource(suggestion.suggestion._source.source), {
    slug: suggestion.suggestion._source.slug
  });
};

// see https://github.com/moroshko/react-autosuggest#themeProp
const suggesterTheme = {
  container: {
    flex: "1 0 auto",
    textAlign: "left",
    border: 0,
    width: "calc(100% - 36px)"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    paddingTop: 10,
    border: "1px solid silver",
    background: "white",
    borderTop: 0,
    position: "absolute",
    width: "calc(100% - 36px)"
  },
  suggestion: {
    listStyleType: "none",
    padding: 5,
    lineHeight: "2rem",
    cursor: "pointer"
  },
  suggestionHighlighted: {
    background: "#eee"
  }
};

class Suggester extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.query !== this.props.query;
  }

  render() {
    const { fetch, query, onChange } = this.props;
    const inputProps = {
      placeholder: "Posez votre question",
      "aria-label": "Posez votre question",
      type: "search",
      className: "search__input",
      value: query,
      onChange: onChange,
      style: { width: "100%" }
    };
    return (
      <AsyncFetch
        fetch={() => fetch(query)}
        render={({ status, result, fetch, clear }) => (
          <Autosuggest
            theme={suggesterTheme}
            suggestions={
              (status === "success" &&
                result &&
                result.hits &&
                result.hits.hits) ||
              []
            }
            alwaysRenderSuggestions={false}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsFetchRequested={fetch}
            onSuggestionsClearRequested={clear}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={renderSuggestionsContainer}
            inputProps={inputProps}
          />
        )}
      />
    );
  }
}

Suggester.propTypes = {
  // on input DOM change
  onChange: PropTypes.func,
  // the fetch call function
  fetch: PropTypes.func.isRequired,
  query: PropTypes.string
};

Suggester.defaultProps = {
  query: "",
  fetch: () => {},
  onChange: () => {}
};

export default Suggester;
