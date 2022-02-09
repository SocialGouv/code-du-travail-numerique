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
import { PublicodesProvider } from "../publicodes";

interface Props {
  icon: string;
  title: string;
  publicodesRules: any;
}

const CalculateurIndemnite = ({
  icon,
  title,
  publicodesRules,
}: Props): JSX.Element => {
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
            dispatch({ payload: module.steps, type: "add_branche" });
          } else {
            dispatch({ type: "remove_branche" });
          }
        }}
      </OnChange>
    </>
  );

  return (
    <PublicodesProvider
      rules={publicodesRules}
      targetRule="contrat salarié . indemnité de licenciement"
    >
      <Wizard
        icon={icon}
        title={title}
        duration="5 à 10 min"
        stepReducer={stepReducer}
        initialState={initialState}
        Rules={Rules}
      />
    </PublicodesProvider>
  );
};

CalculateurIndemnite.propTypes = {
  initialState: PropTypes.object,
};

export { CalculateurIndemnite };
