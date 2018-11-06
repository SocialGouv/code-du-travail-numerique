import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";
import Autosuggest from "react-autosuggest";
import { branches } from "./ccn/branches";
import { PrevNextStepper } from "./PrevNextStepper";

import { labelStyle, radioContainerStyle } from "./steps_styles";

class ChoixCC extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
      hasCC: PropTypes.bool,
      ccName: PropTypes.string,
      ccId: PropTypes.string
    }),
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    value: {
      hasCC: false,
      ccName: null,
      ccId: null
    },
    nextDisabled: false
  };

  state = {
    showCC: this.props.value.hasCC,
    brancheValue: (this.props.value && this.props.value.ccName) || "",
    suggestions: [],
    nextDisabled: false
  };

  componentWillReceiveProps(props) {
    this.setState({
      showCC: props.value.hasCC,
      brancheValue: props.value && props.value.ccName,
      suggestions: [],
      nextDisabled:
        props.value.hasCC && !props.value.ccName && !props.value.ccId
    });
  }

  hasConventionChangeHandler = event => {
    const hasCC = event.target.value === "yes";
    if (!hasCC) {
      this.props.onChange({
        hasCC,
        ccName: null,
        ccId: null
      });
    } else {
      this.setState({
        showCC: hasCC,
        brancheValue: "",
        nextDisabled: true
      });
    }
  };

  onSuggestionSelected = (e, { suggestion }) => {
    this.props.onChange({
      hasCC: true,
      ccName: suggestion.label,
      ccId: suggestion.value
    });
  };

  onBrancheInputChange = (event, { newValue }) => {
    this.setState({ brancheValue: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
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
    const { value, onPrevious, onNext, nextDisabled } = this.props;
    const inputProps = {
      placeholder: "Entrez votre convention",
      "aria-label": "Entrez votre convention",
      type: "search",
      className: "search__input",
      onChange: this.onBrancheInputChange,
      value: this.state.brancheValue,
      style: { width: "100%" }
    };
    const hasCC = value.hasCC || this.state.showCC;

    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>
              Est ce que votre entreprise est affilié à une convention
              collective ?
            </h2>
            <div style={radioContainerStyle}>
              <label style={labelStyle}>
                <input
                  type="radio"
                  onChange={this.hasConventionChangeHandler}
                  name="has-convention"
                  value="yes"
                  checked={hasCC === true}
                  className="bigRadio"
                />{" "}
                Oui
              </label>
              <label style={labelStyle}>
                <input
                  type="radio"
                  onChange={this.hasConventionChangeHandler}
                  name="has-convention"
                  value="no"
                  checked={hasCC === false}
                  className="bigRadio"
                />{" "}
                Non
              </label>
            </div>
            {this.state.showCC && (
              <label htmlFor="select-affiliation">
                Selectioner votre convention collective
                <div>
                  <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={getSuggestionValue}
                    highlightFirstSuggestion
                    focusInputOnSuggestionClick
                    alwaysRenderSuggestions={false}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                </div>
              </label>
            )}
          </React.Fragment>
        </Section>
        <Container>
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onNext}
            nextDisabled={nextDisabled || this.state.nextDisabled}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const getSuggestions = item => {
  const inputValue = item.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : branches.filter(
        branche =>
          branche.label.toLowerCase().slice(0, inputLength) === inputValue
      );
};
const getSuggestionValue = item => {
  return item.label;
};

const renderSuggestion = suggestion => {
  return <div>{suggestion.label}</div>;
};

export { ChoixCC };
