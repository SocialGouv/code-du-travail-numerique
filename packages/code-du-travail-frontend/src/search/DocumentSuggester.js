import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

import Html from "../common/Html";

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

      /**
       * HACK: @lionelb
       * on IE, submit event are not triggered while pressing Enter
       * if there is no <input type="submit"/> present in form
       * solution is to dispatch the submit event manually
       * since calling form.submit() doesn't call
       * onSubmit react form's handler
       */
      const { form } = event.target;
      if (form && form.dispatchEvent) {
        form.dispatchEvent(new Event("submit"));
      }
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
          renderSuggestion={suggestion => renderSuggestion(suggestion, query)}
          renderSuggestionsContainer={renderSuggestionsContainer}
          inputProps={inputProps}
        />
      </Label>
    );
  }
}

const getSuggestionValue = suggestion => suggestion;

const SuggestionContainer = styled.div`
  p {
    margin: 0;
  }
`;

const renderSuggestion = (suggestion, query) => {
  const regexp = new RegExp(query);
  const title = suggestion.replace(regexp, "<b>$&</b>");
  return (
    <SuggestionContainer>
      <Html inline>{title}</Html>
    </SuggestionContainer>
  );
};
const Label = styled.label`
  flex: 1;
  display: flex;
  text-align: left;
`;

const SuggestionsContainer = styled.div`
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
