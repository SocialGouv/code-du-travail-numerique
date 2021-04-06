import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

const SimulateurPreavisRetraite = ({ icon, title }) => (
  <Wizard
    icon={icon}
    title={title}
    initialState={initialState}
    // @ts-ignore
    stepReducer={stepReducer}
  />
);

export { SimulateurPreavisRetraite };
