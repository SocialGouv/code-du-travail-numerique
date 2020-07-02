import PropTypes from "prop-types";
import React from "react";
import Autosuggest from "react-autosuggest";

export class Suggester extends React.Component {
  static propTypes = {
    getSuggestionValue: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    reformatEnteredValue: PropTypes.func,
    renderMessage: PropTypes.func,
    renderSuggestion: PropTypes.func,
    renderSuggestionsContainer: PropTypes.func,
    theme: PropTypes.object,
  };

  static defaultProps = {
    className: "full-width",
    getSuggestionValue: (value) => value.toString(),
    placeholder: "faire une recherche.",
    reformatEnteredValue: (v) => v,
    renderMessage: () => null,
    renderSuggestion: (suggestion) => <span>{suggestion.toString()}</span>,
    renderSuggestionsContainer: undefined,
    theme: undefined,
  };

  state = {
    loading: false,
    query: "",
    suggestions: [],
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]:
        event.target.value &&
        this.props.reformatEnteredValue(event.target.value),
    });
  };

  onSuggestionSelected = (event, data) => {
    this.props.onSelect(data.suggestion, event);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ loading: true, suggestions: null });
    this.props.onSearch(value).then((results) =>
      this.setState({
        loading: false,
        suggestions: results,
      })
    );
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: null,
    });
  };

  render() {
    const { suggestions, query, loading } = this.state;
    const { placeholder, className } = this.props;
    const inputProps = {
      className,
      name: "query",
      onChange: this.onChange,
      placeholder: placeholder,
      type: "search",
      value: query,
    };

    return (
      <React.Fragment>
        <Autosuggest
          suggestions={suggestions || []}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.props.getSuggestionValue}
          renderSuggestion={this.props.renderSuggestion}
          renderSuggestionsContainer={this.props.renderSuggestionsContainer}
          theme={this.props.theme}
          inputProps={inputProps}
        />
        {this.props.renderMessage(query, suggestions, loading)}
      </React.Fragment>
    );
  }
}
