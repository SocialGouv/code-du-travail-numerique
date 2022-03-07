import { theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

import Html from "../../common/Html";

const { colors } = theme;

export class DocumentSuggester extends React.Component {
  focusInput = (autoSuggest) => {
    if (autoSuggest !== null && this.props.hasFocus) {
      autoSuggest.input.focus();
    }
  };

  onSuggestionSelected = (event, data) => {
    this.props.onSelect(data.suggestion, event);
  };

  onKeyPress = (event) => {
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
        let eventSubmit;
        if (typeof Event === "function") {
          eventSubmit = new Event("submit");
        } else {
          // Fixed IE11 issue
          eventSubmit = document.createEvent("Event");
          eventSubmit.initEvent("submit", false, false);
        }

        form.dispatchEvent(eventSubmit);
      }
    }
  };

  render() {
    const {
      ariaLabel,
      className,
      inputId,
      query,
      onChange,
      onSearch,
      onClear,
      placeholder,
      suggestions,
    } = this.props;
    const inputProps = {
      "aria-label": ariaLabel,
      className,
      id: inputId,
      name: "q",
      onChange,
      onKeyPress: this.onKeyPress,
      placeholder,
      title: ariaLabel,
      type: "search",
      value: query,
    };
    return (
      <Autosuggest
        ref={this.focusInput}
        theme={suggesterTheme}
        suggestions={suggestions}
        alwaysRenderSuggestions={false}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={onSearch}
        onSuggestionsClearRequested={onClear}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => renderSuggestion(suggestion, query)}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
      />
    );
  }
}

DocumentSuggester.propTypes = {
  hasFocus: PropTypes.bool,
  inputId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.string,
  suggestions: PropTypes.array,
  children: PropTypes.node,
};

DocumentSuggester.defaultProps = {
  excludeSources: "",
  hasFocus: false,
  inputId: "main-search-input",
  query: "",
  suggestions: [],
};

const getSuggestionValue = (suggestion) => suggestion;

const SuggestionContainer = styled.div`
  p {
    margin: 0;
  }
`;

const renderSuggestion = (suggestion, query) => {
  const title = suggestion.replace(query, `<strong>${query}</strong>`);
  return (
    <SuggestionContainer>
      <Html inline>{title}</Html>
    </SuggestionContainer>
  );
};

const SuggestionsContainer = styled.div`
  ul {
    z-index: 1;
  }
  li[role="option"]:nth-child(2n + 1) {
    background: ${colors.bgSecondary};
  }
`;

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

// see https://github.com/moroshko/react-autosuggest#themeProp
const suggesterTheme = {
  container: {
    flex: "1 1 auto",
  },
  suggestion: {
    borderRadius: "3px",
    cursor: "pointer",
    lineHeight: "2rem",
    listStyleType: "none",
    padding: 5,
  },
  suggestionHighlighted: {
    background: colors.bgTertiary,
  },
  suggestionsList: {
    background: "white",
    border: "1px solid silver",
    borderRadius: "3px",
    boxShadow: "0 10px 10px -10px #b7bcdf",
    left: 0,
    margin: 0,
    marginTop: ".5em",
    padding: 0,
    paddingTop: "0",
    position: "absolute",
    right: 0,
  },
};
