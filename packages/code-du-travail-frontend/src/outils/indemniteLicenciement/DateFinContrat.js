import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { labelStyle, radioContainerStyle } from "./stepStyles";

class DateFinContrat extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: false,
    nextDisabled: false
  };

  render() {
    const { onChange, value, onNext, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>
              Le licenciement a t-il été prononcé avant le
              <b> 27 Août 2017</b>
              &nbsp;?
            </h2>
            <div style={radioContainerStyle}>
              <label style={labelStyle}>
                <input
                  type="radio"
                  onChange={() => onChange(true)}
                  name="isR12342"
                  checked={value === true}
                />
                <span>Oui</span>
              </label>
              <label style={labelStyle}>
                <input
                  type="radio"
                  onChange={() => onChange(false)}
                  name="isR12342"
                  checked={value === false}
                />
                <span>Non</span>
              </label>
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

export { DateFinContrat };
