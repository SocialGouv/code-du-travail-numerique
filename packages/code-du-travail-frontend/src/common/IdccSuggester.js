import React from "react";
import PropTypes from "prop-types";
import { Suggester } from "./Suggester";
import {
  renderSuggestionsContainer,
  Suggestion,
  suggesterTheme
} from "./IdccSuggesterTheme";

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

const renderSuggestion = suggestion => {
  return (
    <Suggestion>
      {suggestion._source.idcc
        ? `IDCC ${suggestion._source.idcc} - ${suggestion._source.title}`
        : suggestion._source.title}
    </Suggestion>
  );
};
