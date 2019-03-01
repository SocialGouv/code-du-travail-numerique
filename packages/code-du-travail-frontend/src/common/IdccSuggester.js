import React from "react";
import PropTypes from "prop-types";
import { Suggester } from "./Suggester";
import styled from "styled-components";

export class IdccSuggester extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };
  onSelect = value => {
    this.props.onSelect(value._source);
  };
  render() {
    return (
      <Suggester
        onSearch={this.props.onSearch}
        onSelect={this.onSelect}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        placeholder="Convention collective"
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
      {suggestion._source.idcc
        ? `IDCC ${suggestion._source.idcc} - ${suggestion._source.title}`
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
