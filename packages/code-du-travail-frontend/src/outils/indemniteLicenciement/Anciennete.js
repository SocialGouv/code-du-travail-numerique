import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { inputStyle } from "./steps_styles";
import { PrevNextStepper } from "./PrevNextStepper";

class Anciennete extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    value: 0,
    nextDisabled: false
  };

  render() {
    const { value, onChange, onNext, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>Quelle est votre ancienneté en mois ?</h2>
            <div style={{ fontSize: "2em" }}>
              <input
                type="number"
                onFocus={e => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onChange={e => onChange(parseFloat(e.target.value) || 0)}
                value={value}
                style={{ width: 180, ...inputStyle }}
              />{" "}
              mois
            </div>
          </React.Fragment>
        </Section>
        <Container>
          <PrevNextStepper onNext={onNext} nextDisabled={nextDisabled} />
        </Container>
      </React.Fragment>
    );
  }
}

export { Anciennete };
