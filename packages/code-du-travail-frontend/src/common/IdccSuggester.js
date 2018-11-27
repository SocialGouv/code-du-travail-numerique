import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

export class IdccSuggester extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  state = {
    query: "",
    suggestions: []
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSuggestionSelected = (e, data) => {
    this.props.onSelect(data.suggestion._source);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.onSearch(value).then(results =>
      this.setState({
        suggestions: results
      })
    );
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const inputProps = {
      name: "query",
      placeholder: "Convention collective ou code NAF",
      value: this.state.query,
      onChange: this.onChange,
      className: "full-width"
    };

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
        theme={suggesterTheme}
      />
    );
  }
}

const getSuggestionValue = suggestion =>
  suggestion._source.idcc
    ? `${suggestion._source.idcc} - ${suggestion._source.title}`
    : suggestion._source.title;

const SuggestionsContainer = styled.div`
  li[role="option"]:nth-child(2n + 1) {
    background: #f7f7f7;
  }
`;

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

const Suggestion = styled.div`
  whitespace: nowrap;
  textoverflow: ellipsis;
  width: 90%;
  overflow: hidden;
  padding: 5px;
  font-size: 0.9rem;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
`;

const renderSuggestion = suggestion => {
  return (
    <Suggestion>
      {suggestion.idcc
        ? `IDCC ${suggestion.idcc} - ${suggestion._source.title}`
        : suggestion._source.title}
    </Suggestion>
  );
};

// see https://github.com/moroshko/react-autosuggest#themeProp
const suggesterTheme = {
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    maxHeight: "300px",
    border: "1px solid silver",
    position: "absolute",
    overflowY: "scroll",
    left: 0,
    right: 0,
    borderRadius: "3px",
    borderRopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: "-3px",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.3)"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    background: "white"
  },
  suggestionHighlighted: {
    background: "#eee"
  }
};
