import React from "react";

import { Wizard } from "../common/Wizard";
import { PublicodesProvider } from "../publicodes";
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
  >
    <Wizard
      icon={icon}
      title={title}
      initialState={initialState}
      // @ts-ignore
      stepReducer={stepReducer}
    />
  </PublicodesProvider>
);

export { SimulateurPreavisRetraite };
