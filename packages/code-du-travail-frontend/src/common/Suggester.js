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
    theme: PropTypes.object,
    reformatSearchedValue: PropTypes.func,
    reformatEnteredValue: PropTypes.func,
    getHelpMessage: PropTypes.func
  };

  static defaultProps = {
    placeholder: "faire une recherche.",
    className: "full-width",
    getSuggestionValue: value => value.toString(),
    renderSuggestion: suggestion => <span>{suggestion.toString()}</span>,
    renderSuggestionsContainer: undefined,
    theme: undefined,
    reformatSearchedValue: v => v,
    reformatEnteredValue: v => v
  };

  state = {
    query: "",
    suggestions: [],
    loading: false
  };

  onChange = event => {
    this.setState({
      [event.target.name]:
        event.target.value &&
        this.props.reformatEnteredValue(event.target.value)
    });
  };

  onSuggestionSelected = (event, data) => {
    this.props.onSelect(data.suggestion, event);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ loading: true });
    this.props.onSearch(this.props.reformatSearchedValue(value)).then(results =>
      this.setState({
        suggestions: results,
        loading: false
      })
    );
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { loading, suggestions, query } = this.state;
    const { placeholder, className, getHelpMessage } = this.props;
    const inputProps = {
      name: "query",
      placeholder: placeholder,
      value: query,
      type: "search",
      onChange: this.onChange,
      className: className
    };
    const helpMessage =
      !loading && getHelpMessage && getHelpMessage(query, suggestions);

    return (
      <React.Fragment>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.props.getSuggestionValue}
          renderSuggestion={this.props.renderSuggestion}
          renderSuggestionsContainer={this.props.renderSuggestionsContainer}
          theme={this.props.theme}
          inputProps={inputProps}
        />
        {getHelpMessage && (
          // we display the <p> tag even when there is no message to prevent flickering
          <p>{helpMessage ? helpMessage : <span>&nbsp;</span>}</p>
        )}
      </React.Fragment>
    );
  }
}
