import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { Input, Label } from "./stepStyles";

class Primes extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: 0,
    nextDisabled: false
  };

  render() {
    const { onChange, value, onPrevious, onNext, nextDisabled } = this.props;

    return (
      <React.Fragment>
        <Section light>
          <h2>
            Montant des primes et/ou 13ème mois sur les 12 derniers mois ?
          </h2>
          <Label>
            <Input
              size={5}
              type="number"
              name="prime"
              onChange={e => onChange(parseFloat(e.target.value) || 0)}
              onFocus={e => {
                if (e.target.value === "0") {
                  e.target.value = "";
                }
              }}
              value={value}
            />{" "}
            €
          </Label>
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

export { Primes };
