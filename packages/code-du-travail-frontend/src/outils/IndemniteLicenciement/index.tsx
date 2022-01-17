import PropTypes from "prop-types";
import React from "react";
import { OnChange } from "react-final-form-listeners";

import { Wizard } from "../common/Wizard";
import {
  initialState,
  stepPrime,
  stepReducer,
  stepSalaires,
} from "./stepReducer";

interface Props {
  icon: string;
  title: string;
}

const CalculateurIndemnite = ({ icon, title }: Props): JSX.Element => {
  /**
   * The rules defined here allows to manage additionnal steps to the wizard
   */
  const Rules = ({ values, dispatch }) => (
    <>
      <OnChange key="rule-same-salaire" name="hasSameSalaire">
        {(value) =>
          value === false
            ? dispatch({
                payload: { insertAfter: stepSalaires.name, step: stepPrime },
                type: "add_step",
              })
            : dispatch({ payload: stepPrime.name, type: "remove_step" })
        }
      </OnChange>
      <OnChange key="rule-branche" name="branche">
        {async (value) => {
          if (value) {
            const module = await import(`./ccn/${value}`);
            const steps = module.steps.filter(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ({ condition = (values) => true }) => condition(values)
            );
            dispatch({ payload: steps, type: "add_branche" });
          } else {
            dispatch({ type: "remove_branche" });
          }
        }}
      </OnChange>
    </>
  );

  return (
    <Wizard
      icon={icon}
      title={title}
      duration="5 à 10 min"
      stepReducer={stepReducer}
      initialState={initialState}
      Rules={Rules}
    />
  );
};

CalculateurIndemnite.propTypes = {
  initialState: PropTypes.object,
};

export { CalculateurIndemnite };
