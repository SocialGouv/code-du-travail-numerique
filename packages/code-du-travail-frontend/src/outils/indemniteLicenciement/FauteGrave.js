import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { SimpleSwitch } from "./SimpleSwitch";

class FauteGrave extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool,
    checked: PropTypes.bool
  };

  static defaultProps = {
    ckecked: false,
    nextDisabled: false
  };

  render() {
    const {
      onChange,
      checked,
      onComplete,
      onPrevious,
      nextDisabled
    } = this.props;
    return (
      <Section light>
        <React.Fragment>
          <h2>Faute grave</h2>
          <SimpleSwitch
            checked={checked}
            id="licencie-faute-grave"
            label="Êtes-vous licencié(e) pour faute grave ?"
            onChange={onChange}
          />
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onComplete}
            nextDisabled={nextDisabled}
          />
        </React.Fragment>
      </Section>
    );
  }
}

export { FauteGrave };
