import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";

export class Suggester extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    getSuggestionValue: PropTypes.func,
    renderSuggestion: PropTypes.func,
    renderSuggestionsContainer: PropTypes.func,
    theme: PropTypes.object
  };

  static defaultProps = {
    placeholder: "faire une recherche.",
    className: "full-width",
    getSuggestionValue: value => value.toString(),
    renderSuggestion: suggestion => <span>{suggestion.toString()}</span>,
    renderSuggestionsContainer: undefined,
    theme: undefined
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

  onSuggestionSelected = (event, data) => {
    this.props.onSelect(data.suggestion, event);
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
      placeholder: this.props.placeholder,
      value: this.state.query,
      type: "search",
      onChange: this.onChange,
      className: this.props.className
    };

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.props.getSuggestionValue}
        renderSuggestion={this.props.renderSuggestion}
        renderSuggestionsContainer={this.props.renderSuggestionsContainer}
        theme={this.props.theme}
        inputProps={inputProps}
      />
    );
  }
}
