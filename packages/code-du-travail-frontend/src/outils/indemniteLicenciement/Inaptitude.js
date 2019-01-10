import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { Label, RadioContainer } from "./stepStyles";

class Inaptitude extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: false,
    nextDisabled: false
  };

  render() {
    const { onChange, value, onNext, onPrevious, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <h2>
            Le licenciement a t-il fait il suite au prononcé d&apos;une
            inaptitude d&apos;origine professionnelle ( accident du travail ou
            maladie professionnelle)&nbsp;?
          </h2>
          <RadioContainer>
            <Label>
              <input
                type="radio"
                onChange={() => onChange(true)}
                name="inaptitude"
                checked={value === true}
              />
              <span>Oui</span>
            </Label>
            <Label>
              <input
                type="radio"
                onChange={() => onChange(false)}
                name="inaptitude"
                checked={value === false}
              />
              <span>Non</span>
            </Label>
          </RadioContainer>
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

export { Inaptitude };
