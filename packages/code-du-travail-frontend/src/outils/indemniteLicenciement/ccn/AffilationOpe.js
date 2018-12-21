import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";
import { PrevNextStepper } from "../PrevNextStepper";
import { RadioContainer, Label } from "../stepStyles";

class AffiliationOpe extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: false,
    nextDisabled: false
  };

  render() {
    const { onChange, value, onPrevious, onNext, nextDisabled } = this.props;

    return (
      <React.Fragment>
        <Section light>
          <h2>
            Est ce que votre entreprise est affiliée à une des organisations
            patronales employeur&nbsp;?
          </h2>
          <RadioContainer>
            <Label>
              <input
                type="radio"
                onChange={() => onChange(true)}
                name="affiliation"
                checked={value === true}
              />{" "}
              Oui
            </Label>
            <Label>
              <input
                type="radio"
                onChange={() => onChange(false)}
                name="affiliation"
                checked={value === false}
              />{" "}
              Non
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

export { AffiliationOpe };
