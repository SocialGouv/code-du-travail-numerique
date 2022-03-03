import React from "react";

import { Wizard } from "../common/Wizard";
import { PublicodesProvider, PublicodesSimulator } from "../publicodes";
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
    simulator={PublicodesSimulator.PREAVIS_RETRAITE}
  >
    <Wizard
      icon={icon}
      title={title}
      duration="5 min"
      initialState={initialState}
      stepReducer={stepReducer}
    />
  </PublicodesProvider>
);

export { SimulateurPreavisRetraite };
