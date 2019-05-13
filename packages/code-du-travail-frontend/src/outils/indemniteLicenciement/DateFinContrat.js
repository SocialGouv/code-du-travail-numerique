import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Wrapper } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { Label, RadioContainer } from "./stepStyles";

class DateFinContrat extends React.Component {
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
                Le licenciement a t-il été prononcé avant le
                <b> 27&nbsp;Septembre&nbsp;2017</b>
                &nbsp;?
              </h2>
              <RadioContainer>
                <Label>
                  <input
                    type="radio"
                    onChange={() => onChange(true)}
                    name="isR12342"
                    checked={value === true}
                  />
                  <span>Oui</span>
                </Label>
                <Label>
                  <input
                    type="radio"
                    onChange={() => onChange(false)}
                    name="isR12342"
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

export { DateFinContrat };
