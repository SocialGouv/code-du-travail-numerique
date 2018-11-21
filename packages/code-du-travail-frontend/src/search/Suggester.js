import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

import AsyncFetch from "../lib/AsyncFetch";
import Router from "next/router";
import { getLabelBySource, getRouteBySource } from "../sources";

const getSuggestionValue = suggestion =>
  `${suggestion._source.source} > ${suggestion._source.title}`;

const ellipsisStyle = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "90%",
  overflow: "hidden"
};

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
      {getLabelBySource(suggestion._source.source)} | {suggestion._source.title}
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

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

const onSuggestionSelected = (e, suggestion, query) => {
  e.preventDefault();
  const route = getRouteBySource(suggestion.suggestion._source.source);
  const anchor = suggestion.suggestion._source.anchor
    ? suggestion.suggestion._source.anchor.slice(1)
    : "";

  Router.push({
    pathname: `/${route}/${suggestion.suggestion._source.slug}`,
    query: { q: query, search: 0 },
    hash: anchor
  });
};

// see https://github.com/moroshko/react-autosuggest#themeProp
const suggesterTheme = {
  container: {
    flex: "1 1 80%",
    textAlign: "left",
    border: 0
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    marginTop: ".5em",
    paddingTop: "0",
    border: "1px solid silver",
    borderRadius: "3px",
    background: "white",
    position: "absolute",
    left: 0,
    right: 0,
    boxShadow: "0 10px 10px -10px #b7bcdf"
  },
  suggestion: {
    listStyleType: "none",
    borderRadius: "3px",
    padding: 5,
    lineHeight: "2rem",
    cursor: "pointer"
  },
  suggestionHighlighted: {
    background: "#eee"
  }
};

class Suggester extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.query !== this.props.query ||
      nextProps.excludeSources !== this.props.excludeSources
    );
  }

  render() {
    const { getResults, query, onChange } = this.props;
    const inputProps = {
      name: "query",
      placeholder:
        "exemple: je travaille dans l'industrie chimique et n'ai pas eu de contrat de travail est-ce normal? ",
      "aria-label":
        "exemple: je travaille dans l'industrie chimique et n'ai pas eu de contrat de travail est-ce normal?",
      type: "search",
      className: "search__input",
      value: query,
      onChange,
      style: { width: "100%" }
    };
    return (
      <AsyncFetch
        fetch={getResults}
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
            onSuggestionSelected={(e, suggestion) =>
              onSuggestionSelected(e, suggestion, query)
            }
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
  getResults: PropTypes.func.isRequired,
  query: PropTypes.string,
  excludeSources: PropTypes.string
};

Suggester.defaultProps = {
  query: "",
  excludeSources: "",
  getResults: () => {},
  onChange: () => {}
};

export default Suggester;
