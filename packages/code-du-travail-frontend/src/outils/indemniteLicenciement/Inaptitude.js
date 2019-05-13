import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Wrapper } from "@cdt/ui";

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
        <Section>
          <Container>
            <Wrapper variant="light">
              <h2>
                Êtes-vous licencié pour inaptitude suite à accident du travail
                ou maladie professionnelle reconnue&nbsp;?
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
            </Wrapper>
          </Container>
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
