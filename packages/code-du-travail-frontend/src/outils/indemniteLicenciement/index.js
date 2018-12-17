import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Container } from "@cdt/ui";
import dynamic from "next/dynamic";
import getIndemnite from "./indemnite";
import { Stepper } from "./Stepper";
import { initialData, steps } from "./casGeneral";
import { ResultDetail } from "./ResultDetail";

const containerRef = React.createRef();

class CalculateurIndemnite extends React.Component {
  static propTypes = {
    q: PropTypes.string
  };

  state = {
    ...initialData,
    steps: [...steps]
  };
  ResultCC = dynamic(import(`./ccn/Result_0044`));

  componentOnChange = ({ key, value }) => {
    this.setState({
      [key]: value
    });
    if (key === "anciennete") {
      this.setState({
        salaires: Array.from({ length: Math.min(value, 12) }).fill(0)
      });
    }
    if (key === "convention") {
      if (value.hasCC) {
        const { ccId } = value;
        import(`./ccn/${ccId}`).then(module => {
          this.setState({
            steps: steps.concat(module.steps),
            calculConvention: module.getIndemnite,
            ...module.initialData
          });
        });
        this.ResultCC = dynamic(import(`./ccn/Result_${ccId}`));
      } else {
        this.setState({
          steps: steps.slice(),
          calculConvention: null
        });
      }
    }
  };

  resetState = callback => {
    const initialkeys = Object.keys(initialData);
    const newState = Object.keys(this.state).reduce((state, key) => {
      if (initialkeys.indexOf(key) === -1) {
        state[key] = undefined;
      } else {
        state[key] = initialData[key];
      }
      return state;
    }, {});
    this.setState(newState, callback);
  };

  render() {
    const indemniteData = getIndemnite(this.state);

    const hasIndemniteCC =
      indemniteData.calculCC && indemniteData.calculCC.indemnite;

    const showResult = indemniteData.errors.length === 0;
    let resultComponent;
    if (
      hasIndemniteCC &&
      indemniteData.calculCC.indemnite > indemniteData.indemnite
    ) {
      resultComponent = <this.ResultCC {...indemniteData.calculCC} />;
    } else {
      resultComponent = <ResultDetail {...indemniteData} />;
    }

    return (
      <Container
        style={{
          textAlign: "left"
        }}
      >
        <React.Fragment>
          <h1>Calculer son indémnité de licenciement</h1>
          <div style={{ width: 700, margin: "0 auto" }} ref={containerRef}>
            <Stepper
              containerRef={containerRef}
              initialStep={0}
              steps={this.state.steps}
              renderRestart={({ restart }) => (
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => {
                      this.resetState(restart);
                    }}
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
          {showResult && resultComponent}
        </React.Fragment>
      </Container>
    );
  }
}

export default CalculateurIndemnite;
