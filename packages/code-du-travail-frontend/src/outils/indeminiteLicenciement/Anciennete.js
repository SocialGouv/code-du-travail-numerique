import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";

import { inputStyle } from "./index";
import { PrevNextStepper } from "./PrevNextStepper";

class Anciennete extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    value: 0,
    nextDisabled: false
  };

  render() {
    const { value, onChange, onComplete, nextDisabled } = this.props;
    return (
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
              style={{ width: 100, ...inputStyle }}
            />{" "}
            mois
            <PrevNextStepper onNext={onComplete} nextDisabled={nextDisabled} />
          </div>
        </React.Fragment>
      </Section>
    );
  }
}

export { Anciennete };
