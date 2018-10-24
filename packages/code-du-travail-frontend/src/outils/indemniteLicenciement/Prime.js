import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";

import { inputStyle } from "./index";

class Primes extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number
  };
  static defaultProps = {
    value: 0,
    nextDisabled: false
  };

  render() {
    const { onChange, value } = this.props;

    return (
      <Section light>
        <h2>Montant des primes et/ou 13ème mois sur les 12 derniers mois ?</h2>
        <input
          type="number"
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          onFocus={e => {
            if (e.target.value === "0") {
              e.target.value = "";
            }
          }}
          value={value}
          style={{ width: 150, ...inputStyle }}
        />{" "}
        €
      </Section>
    );
  }
}

export { Primes };
