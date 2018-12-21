import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { SimpleSwitch } from "./SimpleSwitch";
import { PrevNextStepper } from "./PrevNextStepper";

class FauteGrave extends React.Component {
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
          <h2>Faute grave</h2>
          <SimpleSwitch
            checked={value}
            id="licencie-faute-grave"
            label="Êtes-vous licencié(e) pour faute grave ?"
            onChange={onChange}
          />
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

export { FauteGrave };
