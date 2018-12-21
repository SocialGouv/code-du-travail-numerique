import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";
import FuseInput from "../../lib/FuseInput";
import { branches } from "./ccn/branches";
import { PrevNextStepper } from "./PrevNextStepper";

import { Label, RadioContainer } from "./stepStyles";

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

  onSuggestionSelected = (_, { suggestion }) => {
    this.props.onChange({
      hasCC: true,
      ccName: suggestion.item.label,
      ccId: suggestion.item.value
    });
  };

  render() {
    const { value, onPrevious, onNext, nextDisabled } = this.props;

    const hasCC = value.hasCC || this.state.showCC;

    return (
      <React.Fragment>
        <Section light>
          <h2>
            Est-ce qu&apos;une convention collective s&apos;applique dans votre
            entreprise&nbsp;?
          </h2>
          <RadioContainer>
            <Label>
              <input
                type="radio"
                onChange={this.hasConventionChangeHandler}
                name="has-convention"
                value="yes"
                checked={hasCC === true}
              />{" "}
              Oui
            </Label>
            <Label>
              <input
                type="radio"
                onChange={this.hasConventionChangeHandler}
                name="has-convention"
                value="no"
                checked={hasCC === false}
              />{" "}
              Non
            </Label>
          </RadioContainer>
          {this.state.showCC && (
            <label htmlFor="select-affiliation">
              Selectioner votre convention collective
              <div>
                <FuseInput
                  value={this.state.brancheValue}
                  data={branches}
                  placeholder="ex: Chimie"
                  onSuggestionSelected={this.onSuggestionSelected}
                />
              </div>
            </label>
          )}
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

export { ChoixCC };
