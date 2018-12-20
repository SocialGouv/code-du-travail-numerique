import React from "react";
import PropTypes from "prop-types";
import { PrevNextStepper } from "./PrevNextStepper";
import { Section, Container } from "@cdt/ui";

class TempsPartiel extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };

  render() {
    return (
      <React.Fragment>
        <Section>
          <h2>Avez vous travaillé à temps partiel ?</h2>
          <div style={radioContainerStyle}>
            <label style={labelStyle}>
              <input
                type="radio"
                onChange={this.hasConventionChangeHandler}
                name="has-convention"
                value="yes"
                checked={hasCC === true}
              />{" "}
              Oui
            </label>
            <label style={labelStyle}>
              <input
                type="radio"
                onChange={this.hasConventionChangeHandler}
                name="has-convention"
                value="no"
                checked={hasCC === false}
              />{" "}
              Non
            </label>
          </div>
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

export { TempsPartiel };
