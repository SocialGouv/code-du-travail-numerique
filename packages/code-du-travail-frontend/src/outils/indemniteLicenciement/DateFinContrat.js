import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { inputStyle } from "./index";

class DateFinContrat extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool,
    value: PropTypes.string
  };

  render() {
    const {
      onChange,
      onComplete,
      onPrevious,
      nextDisabled,
      value
    } = this.props;

    return (
      <Section light>
        <h2>Date de fin de votre contrat ?</h2>
        <input
          type="date"
          onChange={e => onChange(e.target.value)}
          value={value}
          style={{ width: 180, ...inputStyle }}
        />
        <PrevNextStepper
          onPrev={onPrevious}
          onNext={onComplete}
          nextDisabled={nextDisabled}
        />
      </Section>
    );
  }
}

export { DateFinContrat };
