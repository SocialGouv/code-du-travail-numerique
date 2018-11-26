import React from "react";
import PropTypes from "prop-types";
import { X, Download } from "react-feather";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import { Button } from "@cdt/ui";

class ConventionForm extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
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
    this.setState({ selected: data.suggestion._source });
  };
  onSelectionCleared = () => {
    this.setState({ selected: null });
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
      <form>
        <h2>Convention collective</h2>
        <div>
          Saisissez l&apos;identifiant de convention collective (IDCC), le nom
          de la branche, ou le code NAF :
          <div style={{ marginTop: 10 }}>
            {!this.state.selected ? (
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
            ) : (
              <div>
                <ConventionPreview data={this.state.selected} />
                <X
                  size="16"
                  onClick={this.onSelectionCleared}
                  style={{ marginLeft: 5, cursor: "pointer" }}
                />
              </div>
            )}
          </div>
          <div>
            <div style={{ marginTop: 20, fontWeight: "bold" }}>
              Comment trouver ma convention collective ?
            </div>
            <li>
              Elle doit figurer au <b>bulletin de paie</b>, et sur une notice
              remise à l&apos;embauche ou <b>sur le contrat de travail</b>
            </li>
            <li>
              Sur l&apos;affichage obligatoire dans l&apos;entreprise (avec les
              modalités de consultation en entreprise)
            </li>
            <div style={{ marginTop: 20, fontWeight: "bold" }}>
              Quelle est la CCN applicable ?
            </div>
            <li>
              En principe celle relevant de l&apos;activité principale dans
              l&apos;entreprise pour les cas les plus simples.
            </li>
          </div>
        </div>
      </form>
    );
  }
}
export { ConventionForm };

const getSuggestionValue = suggestion =>
  suggestion._source.idcc
    ? `${suggestion._source.idcc} - ${suggestion._source.title}`
    : suggestion._source.title;

const ConventionPreview = ({ data }) => (
  <a target="_blank" href={data.url} rel="noopener noreferrer">
    <Download
      alt="Télécharger la convention"
      title="Télécharger la convention"
      size="16"
      style={{ marginRight: 5 }}
    />
    {data.title}
  </a>
);
ConventionPreview.propTypes = {
  data: PropTypes.objectOf({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

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
`;
const renderSuggestion = suggestion => {
  return (
    <Suggestion>
      <Button link style={{ whiteSpace: "normal", fontSize: ".9rem" }}>
        {suggestion.idcc
          ? `IDCC ${suggestion.idcc} - ${suggestion._source.title}`
          : suggestion._source.title}
      </Button>
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
