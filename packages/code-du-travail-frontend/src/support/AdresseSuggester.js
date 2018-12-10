import React from "react";
import PropTypes from "prop-types";
import { Suggester } from "../common/Suggester";
import styled from "styled-components";

export class AdresseSuggester extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    onSelect: () => {}
  };

  onSelect = (suggestion, event) => {
    this.props.onSelect(suggestion, event);
  };

  render() {
    return (
      <Suggester
        onSearch={this.props.onSearch}
        onSelect={this.onSelect}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        placeholder="15 rue du Palais, Metz"
        theme={suggesterTheme}
        className="support__input"
      />
    );
  }
}

const getSuggestionValue = suggestion =>
  `${suggestion.properties.name}, ${suggestion.properties.city}`;

const SuggestionsContainer = styled.div`
  li[role="option"]:nth-child(2n + 1) {
    background: #f7f7f7;
  }
`;

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

const SuggestionWrapper = styled.div`
  display: flex;
  font-size: 0.9rem;
  text-align: left;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
  padding: 5px;
`;
const Adresse = styled.span`
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Ville = styled.span`
  white-space: nowrap;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

const renderSuggestion = suggestion => {
  return (
    <SuggestionWrapper
      title={`${suggestion.properties.name}, ${
        suggestion.properties.postcode
      } ${suggestion.properties.city}`}
    >
      <Adresse>{suggestion.properties.name}</Adresse>

      <Ville>, {suggestion.properties.city}</Ville>
    </SuggestionWrapper>
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
