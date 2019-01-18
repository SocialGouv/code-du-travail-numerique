import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { Label, RadioContainer } from "./stepStyles";
import { SalaireTempsPlein } from "./SalaireTempsPlein";
import { SalaireTempsPartiel } from "./SalaireTempsPartiel";

class Salaire extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
      isPartiel: PropTypes.bool,
      periods: PropTypes.array,
      derniersMois: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    nextDisabled: false
  };

  onTempsPartielChange = event => {
    const { value } = this.props;
    const hasTempsPartiel = event.target.value === "yes";
    this.props.onChange({
      ...value,
      isPartiel: hasTempsPartiel
    });
  };

  render() {
    const { onPrevious, onNext, nextDisabled, value, onChange } = this.props;
    const SalaireComponent = value.isPartiel
      ? SalaireTempsPartiel
      : SalaireTempsPlein;
    return (
      <React.Fragment>
        <Section light>
          <RadioContainer>
            <h2>
              Avez vous eu des périodes de cumul temps plein temps partiel
              depuis votre embauche ?
            </h2>
            <Label>
              <input
                type="radio"
                onChange={this.onTempsPartielChange}
                name="has-temps-partiel"
                value="yes"
                checked={value.isPartiel === true}
              />{" "}
              Oui
            </Label>
            <Label>
              <input
                type="radio"
                onChange={this.onTempsPartielChange}
                name="has-temps-partiel"
                value="no"
                checked={value.isPartiel === false}
              />{" "}
              Non
            </Label>
          </RadioContainer>
          <SalaireComponent onChange={onChange} value={value} />
        </Section>
        <Container>
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onNext}
            nextDisabled={nextDisabled}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export { Salaire };
