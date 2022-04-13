import PropTypes from "prop-types";
import React from "react";
import { OnChange } from "react-final-form-listeners";

import { Wizard } from "../common/Wizard";
import { PublicodesProvider, PublicodesSimulator } from "../publicodes";
import {
  initialState,
  stepPrime,
  stepReducer,
  stepSalaires,
} from "./stepReducer";

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
  const Rules = ({ dispatch }) => (
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
    </>
  );

  return (
    <PublicodesProvider
      rules={publicodesRules}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
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
