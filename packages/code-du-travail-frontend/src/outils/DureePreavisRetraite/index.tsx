import React from "react";

import { Wizard } from "../common/Wizard";
import { PublicodeProvider } from "../publicodes";
import { initialState, stepReducer } from "./stepReducer";

const SimulateurPreavisRetraite = ({ icon, title }) => (
  <PublicodeProvider rule="contrat salarié . préavis de retraite">
    <Wizard
      icon={icon}
      title={title}
      initialState={initialState}
      // @ts-ignore
      stepReducer={stepReducer}
    />
  </PublicodeProvider>
);

export { SimulateurPreavisRetraite };
