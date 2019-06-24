import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import { OnChange } from "react-final-form-listeners";
import { Section, Container, Wrapper } from "@cdt/ui";

import { StepReducer, getInitialSteps } from "./reducer";
import { Wizard } from "./Wizard";

function CalculateurIndemnite() {
  const initialSteps = getInitialSteps();
  const [steps, dispatch] = useReducer(StepReducer, initialSteps);
  const [values, setValues] = useState({});
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
          const steps = module.steps.filter(({ condition = () => true }) =>
            condition(values)
          );
          dispatch({ type: "add_branche", payload: steps });
        } else {
          dispatch({ type: "remove_branche" });
        }
      }}
    </OnChange>
  ];

  // when at the end, the form is submitted
  // we reset the form data
  const onSubmit = () => {
    dispatch({
      type: "reset",
      payload: getInitialSteps()
    });
  };

  return (
    <Section>
      <Container>
        <Wrapper variant="light">
          <h1>Calculateur d&apos;indemnités de licenciement</h1>
          <Wizard
            steps={steps}
            onSubmit={onSubmit}
            onUpdate={setValues}
            rules={rules}
          />
        </Wrapper>
      </Container>
    </Section>
  );
}

CalculateurIndemnite.propTypes = {
  initialState: PropTypes.object
};

export { CalculateurIndemnite };
