import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import { getLabelBySource } from "../sources";

export class DocumentSuggester extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    query: PropTypes.string,
    inputId: PropTypes.string,
    suggestions: PropTypes.array
  };

  static defaultProps = {
    query: "",
    inputId: "main-search-input",
    excludeSources: "",
    suggestions: []
  };

  focusInput = autoSuggest => {
    if (autoSuggest !== null && this.props.query.trim().length === 0) {
      autoSuggest.input.focus();
    }
  };

  onSuggestionSelected = (event, data) => {
    this.props.onSelect(data.suggestion, event);
  };

  onKeyPress = event => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  render() {
    const { query, onChange, onSearch, onClear, suggestions } = this.props;
    const inputProps = {
      id: this.props.inputId,
      name: "query",
      placeholder: this.props.placeholder,
      "aria-label": this.props.ariaLabel,
      type: "search",
      className: this.props.className,
      value: query,
      onChange,
      onKeyPress: this.onKeyPress
    };
    return (
      <Label htmlFor={this.props.inputId}>
        <span className="hidden">Rechercher</span>
        <Autosuggest
          id="cdtn-documents-suggester"
          ref={this.focusInput}
          theme={suggesterTheme}
          suggestions={suggestions}
          alwaysRenderSuggestions={false}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={onSearch}
          onSuggestionsClearRequested={onClear}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          inputProps={inputProps}
        />
      </Label>
    );
  }
}

const getSuggestionValue = suggestion => suggestion._source.title;

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

const renderSuggestion = suggestion => {
  const source = getLabelBySource(suggestion._source.source);
  return (
    <SuggestionContainer>
      <b>
        {source ? `${source} | ` : ""} {suggestion._source.title}
      </b>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: cleanHtml(
            (suggestion.highlight &&
              ((suggestion.highlight.text && suggestion.highlight.text[0]) ||
                (suggestion.highlight.title &&
                  suggestion.highlight.title[0]))) ||
              ""
          )
        }}
      />
    </SuggestionContainer>
  );
};
const Label = styled.label`
  flex: 1;
  display: flex;
  text-align: left;
`;

const SuggestionsContainer = styled.div`
  white-space: "nowrap";
  text-overflow: "ellipsis";
  width: "90%";
  overflow: "hidden";

  ul {
    z-index: 100;
  }
  li[role="option"]:nth-child(2n + 1) {
    background: #f7f7f7;
  }
`;

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

// see https://github.com/moroshko/react-autosuggest#themeProp
const suggesterTheme = {
  container: {
    flex: 1
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
