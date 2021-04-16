import React from "react";

import { Wizard } from "../common/Wizard";
import { PublicodesProvider } from "../publicodes/index";
import { initialState, stepReducer } from "./stepReducer";

const SimulateurPreavisRetraite = ({ icon, title, publicodeRules }) => (
  <PublicodesProvider
    rules={publicodeRules}
    targetRule="contrat salarié . préavis de retraite"
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
