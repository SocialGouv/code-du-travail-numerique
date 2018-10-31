import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Container } from "@cdt/ui";

import getIndemnite from "./indemnite";
import { Stepper } from "./Stepper";
import { initialData, steps } from "./cas_general";

import { ResultDetail } from "./ResultDetail";

export const inputStyle = {
  padding: 0,
  fontSize: "1.5rem",
  textAlign: "center"
};

class CalculateurIndemnite extends React.Component {
  static propTypes = {
    q: PropTypes.string
  };

  state = {
    ...initialData,
    steps: [...steps]
  };

  componentOnChange = ({ key, value }) => {
    if (key === "convention" && value.hasCC) {
    } else {
      this.setState({ [key]: value });
    }
  };

  render() {
    const indemniteData = getIndemnite(this.state);
    return (
      <Container
        style={{
          textAlign: "left"
        }}
      >
        <React.Fragment>
          <div style={{ width: 700, margin: "0 auto" }}>
            <Stepper
              initialStep={5}
              steps={this.state.steps}
              renderRestart={({ restart }) => (
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => this.setState(initialData, () => restart())}
                    primary
                  >
                    recommencer
                  </Button>
                </div>
              )}
              render={({ Component, key, onNext, onPrevious }) => (
                <Component
                  key={key}
                  value={this.state[key]}
                  onChange={value => this.componentOnChange({ key, value })}
                  onNext={onNext}
                  onPrevious={onPrevious}
                  nextDisabled={indemniteData.errors.length > 0}
                />
              )}
            />
            <br />
            {indemniteData.errors.length > 0 && (
              <Container style={{ fontSize: "1.5em" }}>
                {indemniteData.errors.map(error => (
                  <Alert {...{ [error.type]: true }} key={error.message}>
                    <div dangerouslySetInnerHTML={{ __html: error.message }} />
                  </Alert>
                ))}
              </Container>
            )}
          </div>
          {indemniteData.errors.length === 0 &&
            indemniteData.indemnite && <ResultDetail {...indemniteData} />}
        </React.Fragment>
      </Container>
    );
  }
}

export default CalculateurIndemnite;
