import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Wrapper } from "@cdt/ui";

import { Input, Label } from "./stepStyles";
import { PrevNextStepper } from "./PrevNextStepper";

class Anciennete extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    value: 0,
    nextDisabled: false
  };

  render() {
    const { value, onChange, onNext, onPrevious, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section>
          <Container>
            <Wrapper variant="light">
              <h2>Quelle est votre ancienneté en mois ?</h2>
              <Label>
                <Input
                  size={5}
                  name="anciennete"
                  type="number"
                  onFocus={e => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                  onChange={e => onChange(parseFloat(e.target.value) || 0)}
                  value={value}
                />{" "}
                mois
              </Label>
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

export { Anciennete };
