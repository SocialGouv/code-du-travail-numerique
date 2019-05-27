import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { Section, Container, Wrapper } from "@cdt/ui";
import {
  CalculateurReducer,
  resetState,
  getInitialData,
  getInitialSteps
} from "./reducer";
import { Wizard } from "./Wizard";
import { OnChange } from "react-final-form-listeners";

function CalculateurIndemnite() {
  const initialData = getInitialData();
  const [state, dispatch] = useReducer(
    CalculateurReducer,
    initialData,
    resetState
  );

  /**
   * The rules defined here allows to manage additionnal steps to the form
   */
  const rules = [
    <OnChange key="rule-same-salaire" name="hasSameSalaire">
      {value =>
        value === false
          ? dispatch({ type: "add_primes" })
          : dispatch({ type: "remove_primes" })
      }
    </OnChange>,
    <OnChange key="rule-branche" name="branche">
      {async value => {
        if (value) {
          const module = await import(`./ccn/${value}`);
          dispatch({ type: "add_branche", payload: module.steps });
        } else {
          dispatch({ type: "remove_branche" });
        }
      }}
    </OnChange>
  ];

  // when at the end, the form is submited
  // whe reset the forms data
  const onSubmit = () => {
    dispatch({
      type: "reset",
      payload: {
        steps: getInitialSteps()
      }
    });
  };

  return (
    <Section>
      <Container>
        <Wrapper variant="light">
          <h1>Calculateur d&apos;indemnités de licenciement</h1>
          <Wizard steps={state.steps} onSubmit={onSubmit} rules={rules} />
        </Wrapper>
      </Container>
    </Section>
  );
}

CalculateurIndemnite.propTypes = {
  initialState: PropTypes.object
};

export { CalculateurIndemnite };
