import React from "react";

import { Wizard } from "../common/Wizard";
import {
  PublicodesProvider,
  PublicodesSupportedSimulator,
} from "../publicodes";
import { initialState, stepReducer } from "./stepReducer";

interface Props {
  icon: string;
  title: string;
  publicodesRules: any;
}

const SimulateurPreavisRetraite = ({
  icon,
  title,
  publicodesRules,
}: Props): JSX.Element => (
  <PublicodesProvider
    rules={publicodesRules}
    targetRule="contrat salarié . préavis de retraite en jours"
    simulator={PublicodesSupportedSimulator.PreavisRetraite}
  >
    <Wizard
      icon={icon}
      title={title}
      duration="5 min"
      initialState={initialState}
      // @ts-ignore
      stepReducer={stepReducer}
    />
  </PublicodesProvider>
);

export { SimulateurPreavisRetraite };
