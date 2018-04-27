import React from "react";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import getSlug from "speakingurl";

import "./FuseInput.css";

const DEFAULT_FUSE_OPTIONS = {
  shouldSort: true,
  //tokenize: true,
  //matchAllTokens: true,
  includeMatches: true,
  //findAllMatches: true,
  includeScore: true,
  threshold: 0.75,
  //location: 0,
  //distance: 100,
  maxPatternLength: 16,
  minMatchCharLength: 3,
  keys: ["labelNormalized"]
};

// normalize strings for i18n
const normalize = str =>
  getSlug(str, {
    separator: " ",
    mark: true,
    lang: "fr",
    uric: true,
    uricNoSlash: true,
    maintainCase: true
  });

// render a highlighted html with span.fuse-highlighter from a fuse.js suggestion and a query.
const FuseHighLighter = ({ suggestion, query, style }) => {
  let html = suggestion.item.label;
  let offset = 0;
  let newHtml;
  suggestion.matches.forEach(match => {
    match.indices.forEach(indice => {
      if (indice[1] - indice[0] > 1) {
        newHtml = html.slice(0, indice[0] + offset);
        newHtml += `<span class="fuse-highlighter">`;
        newHtml += html.slice(indice[0] + offset, indice[1] + offset + 1);
        newHtml += `</span>`;
        newHtml += html.slice(indice[1] + offset + 1);
        offset += newHtml.length - html.length;
        html = newHtml;
      }
    });
  });
  return (
    <div
      style={style}
      dangerouslySetInnerHTML={{
        __html: newHtml || html
      }}
    />
  );
};

const getSuggestionValue = suggestion => suggestion.item.label;

const renderSuggestion = query => suggestion => (
  <FuseHighLighter query={query} suggestion={suggestion} />
);

class FuseInput extends React.Component {
  state = {
    value: "",
    suggestions: []
  };
  componentDidMount() {
    const data = this.props.data.map(d => ({
      ...d,
      labelNormalized: normalize(d.label)
    }));
    this.fuse = new Fuse(data, DEFAULT_FUSE_OPTIONS);
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const getSuggestions = value =>
      this.fuse
        .search(normalize(value))
        .filter(q => q.matches.length)
        .slice(0, 25);

    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      value,
      onChange: this.onChange,
      placeholder: this.props.placeholder
    };

    return (
      <Autosuggest
        {...this.props}
        highlightFirstSuggestion={false}
        focusInputOnSuggestionClick={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion(value)}
        inputProps={inputProps}
      />
    );
  }
}

export default FuseInput;
