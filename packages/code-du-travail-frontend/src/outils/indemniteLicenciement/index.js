import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Container } from "@cdt/ui";

import getIndemnite from "./indemnite";
import { Stepper } from "./Stepper";
import { Anciennete } from "./Anciennete";
import { FauteGrave } from "./FauteGrave";
import { Salaire } from "./Salaire";
import { Primes } from "./Prime";
import { DateFinContrat } from "./DateFinContrat";
import { ResultDetail } from "./ResultDetail";
import { PrevNextStepper } from "./PrevNextStepper";
export const inputStyle = {
  padding: 0,
  fontSize: "1.5rem",
  textAlign: "center"
};

const INITIAL_STATE = {
  fauteGrave: false,
  anciennete: 0,
  primes: 0,
  dateFinContrat: "",
  salaires: Array.from({ length: 12 }).fill(1498.47) // Prefill with SMIC brut
};

class CalculateurIndemnite extends React.Component {
  static propTypes = {
    q: PropTypes.string
  };

  state = INITIAL_STATE;

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
              render={({ step, onComplete, onPrevious, restart }) => {
                const stepperUi = (
                  <PrevNextStepper
                    onPrevious={onPrevious}
                    onNext={onComplete}
                    nextDisabled={indemniteData.errors.length > 0}
                  />
                );

                switch (step) {
                  case 0:
                    return (
                      <React.Fragment>
                        {stepperUi}
                        <Anciennete
                          key="anciennete"
                          onChange={anciennete => this.setState({ anciennete })}
                          value={this.state.anciennete}
                        />
                      </React.Fragment>
                    );
                  case 1:
                    return (
                      <React.Fragment>
                        {stepperUi}
                        <FauteGrave
                          key="faute-grave"
                          onChange={checked =>
                            this.setState({ fauteGrave: checked })
                          }
                          checked={this.state.fauteGrave}
                        />
                      </React.Fragment>
                    );
                  case 2:
                    return (
                      <React.Fragment>
                        {stepperUi}
                        <Salaire
                          key="step"
                          onChange={salaires => this.setState({ salaires })}
                          value={this.state.salaires}
                        />
                      </React.Fragment>
                    );
                  case 3:
                    return (
                      <React.Fragment>
                        {stepperUi}
                        <Primes
                          onChange={primes => this.setState({ primes })}
                          value={this.state.primes}
                        />
                      </React.Fragment>
                    );
                  case 4:
                    return (
                      <React.Fragment>
                        {stepperUi}
                        <DateFinContrat
                          onComplete={onComplete}
                          onPrevious={onPrevious}
                          onChange={dateFinContrat =>
                            this.setState({ dateFinContrat })
                          }
                          value={this.state.dateFinContrat}
                          nextDisabled={indemniteData.errors.length > 0}
                        />
                      </React.Fragment>
                    );
                  case 5:
                    return (
                      <div style={{ textAlign: "center" }}>
                        <Button
                          onClick={e =>
                            this.setState(
                              CalculateurIndemnite.INITIAL_STATE,
                              () => restart()
                            )
                          }
                          primary
                        >
                          recommencer
                        </Button>
                      </div>
                    );
                }
              }}
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
