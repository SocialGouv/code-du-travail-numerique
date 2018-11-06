import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { inputStyle } from "./steps_styles";

class Primes extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
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
          <React.Fragment>
            <h2>
              Montant des primes et/ou 13ème mois sur les 12 derniers mois ?
            </h2>
            <input
              type="number"
              onChange={e => onChange(parseFloat(e.target.value) || 0)}
              onFocus={e => {
                if (e.target.value === "0") {
                  e.target.value = "";
                }
              }}
              value={value}
              style={{ width: 150, ...inputStyle }}
            />{" "}
            €
          </React.Fragment>
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
