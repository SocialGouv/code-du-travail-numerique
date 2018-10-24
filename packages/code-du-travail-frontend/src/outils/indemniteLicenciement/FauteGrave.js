import React from "react";
import PropTypes from "prop-types";
import { Section } from "@cdt/ui";

import { SimpleSwitch } from "./SimpleSwitch";

class FauteGrave extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool
  };

  static defaultProps = {
    ckecked: false,
    nextDisabled: false
  };

  render() {
    const { onChange, checked } = this.props;
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
        </React.Fragment>
      </Section>
    );
  }
}

export { FauteGrave };
